<template>
  <v-data-table :headers="headers" :items="students" class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer />
        <v-btn color="primary" class="mb-2" link to="/alunos/0">
          Cadastrar aluno
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item: { id } }">
      <v-icon small class="mr-2" @click="edit(id)"> mdi-pencil </v-icon>
      <v-icon small @click="deleting(id)"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <v-container>Não existe alunos cadastrados!</v-container>
    </template>
  </v-data-table>
</template>

<script lang="ts" src="./Students.ts" />
