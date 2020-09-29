import { TableNames } from "../TableNames";
import knex from './../connection';

/**
 * Base class for cruds
 * 
 * @param T Definition of the table
 */
export class Crud<T> {
    private mock: T[] = [];

    /**
     * @param tableName Table name
     * @param test Is unit tests
     */
    constructor(
        /**
         * Table name in database
         */
        private tableName: TableNames,
        /**
         * If `true` simulates a database
         */
        private test?: boolean,
    ) { }

    /**
     * Return a `T` register
     * @param id `T` identifier
     */
    async getById(id: number): Promise<T | { error: any }> {

        if (this.test) {
            const register = this.mock.find((register: any) => register.id === id)
            if (!register) return { error: 'Not found' };

            return register;
        }

        try {
            return await knex(this.tableName)
                .select('*')
                .where(id)
                .first();
        } catch (error) {
            return { error };
        }
    }

    /**
     * Return a `T` array 
     */
    async getAll(): Promise<T[] | { error: any }> {

        if (this.test) {
            return this.mock;
        }

        try {
            return await knex(this.tableName).select('*');
        } catch (error) {
            return { error };
        }
    }

    /**
     * Create a new `T` register
     * @param values entity `T`
     */
    async create(values: T): Promise<number | { error: any }> {

        if (this.test) {
            this.mock.sort((a: any, b: any) => a.id - b.id);
            const lastRegister: any = this.mock[this.mock.length - 1];

            if (!lastRegister && this.mock.length > 0) return { error: 'Not created' };

            const position = this.mock.push({ ...values, id: (lastRegister?.id || 0) + 1 });
            if (!position) return { error: 'Not created' };

            return (lastRegister?.id || 0) + 1;
        } else {

            try {
                return await knex(this.tableName)
                    .insert(values)
                    .returning('id')
                    .first();
            } catch (error) {
                return { error };
            }
        }
    }

    /**
     * Update a `T` register
     * @param id `T` identifier
     * @param values entity `T`
     */
    async update(id: number, values: Partial<T>): Promise<void | { error: any }> {

        if (this.test) {
            let register = this.mock.find((register: any) => register.id === id)
            if (!register) return { error: 'Not found' };

            register = {
                ...register,
                id: id,
                ...values,
            };

            const index = this.mock.findIndex((register: any) => register.id === id);
            this.mock.splice(index, 1, register);
        }

        try {
            await knex(this.tableName)
                .update({ ...values })
                .where(id);

            return;
        } catch (error) {
            return { error };
        }
    }

    /**
     * Delete a `T` register
     * @param id `T` identifier
     */
    async delete(id: number): Promise<void | { error: any }> {

        if (this.test) {
            const indexToRemove = this.mock.findIndex((register: any) => register.id === id);
            if (indexToRemove < 0) return { error: 'Not found' };

            this.mock.splice(indexToRemove, 1);
        }

        try {
            await knex(this.tableName)
                .where(id)
                .delete();

            return;
        } catch (error) {
            return { error };
        }
    }
}
