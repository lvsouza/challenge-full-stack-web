import { Crud } from "../../common/CrudBase";

/**
 * 
 */
export interface Student { }

/**
 * 
 */
export class CreateStudentProvider {
    constructor(
        /**
         * 
         */
        private entity: Crud<Student>,
    ) { }

    /**
     * 
     */
    async create(student: Student): Promise<number> {
        throw new Error("Not implemented");
    }
}
