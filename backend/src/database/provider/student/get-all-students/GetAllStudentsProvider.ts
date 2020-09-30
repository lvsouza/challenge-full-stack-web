import { Result } from "../../../../types/Result";
import { Crud } from "../../../common/CrudBase";
import { IStudent } from "../IStudent";

/**
 * Class to get all students
 */
export class GetAllStudentsProvider {
    constructor(
        /**
         * Entity in database that allow create, read, update and delete new records.
         */
        private entity: Crud<IStudent>,
    ) { }

    /**
     * Method that allow get all records in student table
     */
    async getAll(): Promise<Result<IStudent[]>> {
        return await this.entity.getAll();
    }
}
