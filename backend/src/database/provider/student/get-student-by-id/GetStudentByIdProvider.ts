import { Result } from "../../../../types/Result";
import { Crud } from "../../../common/CrudBase";
import { IStudent } from "../IStudent";

/**
 * Class to get student by id
 */
export class GetStudentByIdProvider {
    constructor(
        /**
         * Entity in database that allow create, read, update and delete new records.
         */
        private entity: Crud<IStudent>,
    ) { }

    /**
     * Method that allow get a record by id in student table
     */
    async getById(id: number): Promise<Result<IStudent>> {
        throw new Error("Not implemented");
    }
}
