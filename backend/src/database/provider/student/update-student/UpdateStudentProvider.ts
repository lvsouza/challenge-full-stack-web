import { Result } from "../../../../types/Result";
import { Crud } from "../../../common/CrudBase";
import { IStudent } from "../IStudent";

/**
 * Class to update a student
 */
export class UpdateStudentProvider {
    constructor(
        /**
         * Entity in database that allow create, read, update and delete new records.
         */
        private entity: Crud<IStudent>,
    ) { }

    /**
     * Method that allow update a record in student table
     * 
     * @return IStudent | error - Student updated
     */
    async update(id: number, student: Omit<IStudent, 'cpf' | 'id' | 'ra'>): Promise<Result<IStudent>> {

        if (!student.email) return { error: 'Invalid field: \'email\'' };
        if (!student.name) return { error: 'Invalid field: \'name\'' };

        return await this.entity.update(id, student);;
    }
}
