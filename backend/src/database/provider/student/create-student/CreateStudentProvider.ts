import { Result } from "../../../../types/Result";
import { randomize } from "../../../../services";
import { TableNames } from "../../../TableNames";
import { Crud } from "../../../common/CrudBase";
import { IStudent } from "../IStudent";

/**
 * Class to create a new student
 */
export class CreateStudentProvider {
    constructor(
        /**
         * Entity in database that allow create, read, update and delete new records.
         */
        private entity: Crud<IStudent>,
    ) { }

    /**
     * Method that allow create a new record in student table
     */
    async create(student: Omit<IStudent, 'id'>): Promise<Result<number>> {

        if (!student.email) return { error: 'Invalid field: \'Email\'' };
        if (!student.name) return { error: 'Invalid field: \'Name\'' };
        if (!student.cpf) return { error: 'Invalid field: \'Cpf\'' };
        if (!student.ra) return { error: 'Invalid field: \'Ra\'' };

        const duplicatedRaCount = await this.entity.customKnexQuery(async knex => {
            const { count }: any = await knex(TableNames.student)
                .where('ra', student.ra)
                .count('*')
                .first();

            return count;
        });

        if (duplicatedRaCount > 0) {
            return {
                error: '\'Ra\' is duplicated'
            }
        }

        return await this.entity.create({
            ...student,
            ra: student.ra,
            id: null,
        });
    }
}
