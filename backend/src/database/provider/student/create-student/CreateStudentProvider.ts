import { Result } from "../../../../types/Result";
import { randomize } from "../../../../services";
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
    async create(student: Omit<IStudent, 'id' | 'ra'>): Promise<Result<number>> {

        if (!student.email) return { error: 'Invalid field: \'email\'' };
        if (!student.name) return { error: 'Invalid field: \'name\'' };
        if (!student.cpf) return { error: 'Invalid field: \'Cpf\'' };

        let ra = randomize(1, 100000);
        /* let duplicatedRa = false;
        
        do {
            ra = randomize(1, 100);
            duplicatedRa = await this.entity.customKnexQuery<boolean>(async knex => {
                const res = await knex(TableNames.student)
                    .where(ra)
                    .count();

                return Boolean(res);
            })
        } while (duplicatedRa); */

        return await this.entity.create({
            ...student,
            id: null,
            ra
        });
    }
}
