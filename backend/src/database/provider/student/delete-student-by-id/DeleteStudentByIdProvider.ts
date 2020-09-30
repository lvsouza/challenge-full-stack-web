import { Result } from "../../../../types/Result";
import { Crud } from "../../../common/CrudBase";
import { IStudent } from "../IStudent";

/**
 * Class to get student by id
 */
export class DeleteStudentByIdProvider {
    constructor(
        /**
         * Entity in database that allow create, read, update and delete new records.
         */
        private entity: Crud<IStudent>,
    ) { }

    /**
     * Method that allow get a record by id in student table
     */
    async deleteById(id: number): Promise<Result<boolean>> {
        throw new Error("Not implemented");
    }
}
