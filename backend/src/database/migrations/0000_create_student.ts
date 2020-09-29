import Knex from "knex";

import { TableNames } from './../TableNames';

export async function up(knex: Knex) {
    return knex.schema.createTable(TableNames.student, table => {
        table.bigIncrements('id').primary().index();

        table.integer('ra').unique().index().notNullable();
        table.string('email', 100).index().notNullable();
        table.string('cpf', 14).index().notNullable();
        table.string('name', 100).notNullable();

        // Comment in the table
        table.comment("Table used to store students.");
    })
        .then(() => console.log(`\n\n# Created table ${TableNames.student}.`));
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(TableNames.student)
        .then(() => console.log(`Dropped table ${TableNames.student}.`));
}
