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
    async create(student: Omit<IStudent, 'id' | 'ra'>): Promise<number | { error: any }> {
        throw new Error("Not implemented");
    }
}
