import Knex from "knex";
import { Result } from "../../types/Result";
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
    async getById(id: number): Promise<Result<T, any>> {

        if (this.test) {
            const register = this.mock.find((register: any) => register.id === id)
            if (!register) {
                return { error: 'Not found' } as any;
            }

            return { result: register } as any;
        } else {

            try {
                const result = await knex(this.tableName)
                    .where('id', id)
                    .select('*')
                    .first();

                return { result } as any;
            } catch (error) {
                return { error } as any;
            }
        }
    }

    /**
     * Return a `T` array 
     */
    async getAll(): Promise<Result<T[]>> {
        if (this.test) {
            return { result: this.mock };
        }

        try {
            return { result: await knex(this.tableName).select('*') };
        } catch (error) {
            return { error };
        }
    }

    /**
     * Create a new `T` register
     * @param values entity `T`
     */
    async create(values: T): Promise<Result<number>> {
        if (this.test) {
            this.mock.sort((a: any, b: any) => a.id - b.id);
            const lastRegister: any = this.mock[this.mock.length - 1];

            if (!lastRegister && this.mock.length > 0) return { error: 'Not created' };

            const position = this.mock.push({ ...values, id: (lastRegister?.id || 0) + 1 });
            if (!position) return { error: 'Not created' };

            return { result: (lastRegister?.id || 0) + 1 };
        } else {

            try {
                return {
                    result: Number((await knex(this.tableName)
                        .insert({ ...values, id: undefined })
                        .returning('id')).shift()),
                }
            } catch (error) {
                console.log(error)
                return { error };
            }
        }
    }

    /**
     * Update a `T` register
     * @param id `T` identifier
     * @param values entity `T`
     */
    async update(id: number, values: Partial<T>): Promise<Result<void>> {

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

            return;
        } else {
            try {
                await knex(this.tableName)
                    .update({ ...values })
                    .where(id);

                return;
            } catch (error) {
                return { error };
            }
        }
    }

    /**
     * Delete a `T` register
     * @param id `T` identifier
     */
    async delete(id: number): Promise<Result<void>> {
        if (this.test) {
            const indexToRemove = this.mock.findIndex((register: any) => register.id === id);
            if (indexToRemove < 0) return { error: 'Not found' };

            this.mock.splice(indexToRemove, 1);

            return;
        } else {
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

    async customKnexQuery<Type = any>(fn: (knex: Knex) => Promise<Type>): Promise<Type> {
        return await fn(knex);
    }
}
