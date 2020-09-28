import { TableNames } from "../TableNames";

/**
 * 
 */
export class Crud<T> {
    constructor(
        /**
         * 
         */
        private tableName: TableNames,
        /**
         * 
         */
        private test?: boolean,
    ) { }

    /**
     * 
     * @param id 
     */
    async readById(id: number): Promise<T | { error: any }> {
        throw new Error("Not implemented");
    }

    /**
     * 
     */
    async readAll(): Promise<T[] | { error: any }> {
        throw new Error("Not implemented");
    }

    /**
     * 
     * @param values 
     */
    async create(values: T): Promise<number | { error: any }> {
        throw new Error("Not implemented");
    }

    /**
     * 
     * @param values 
     */
    async update(values: Partial<T>): Promise<void | { error: any }> {
        throw new Error("Not implemented");
    }

    /**
     * 
     * @param id 
     */
    async delete(id: number): Promise<void | { error: any }> {
        throw new Error("Not implemented");
    }
}
