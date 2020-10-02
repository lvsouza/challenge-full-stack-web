<template>
  <v-container>
    <v-data-table :headers="headers" :items="students" class="elevation-3">
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
        <v-container>Não existem alunos cadastrados!</v-container>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card>
        <v-card-title class="">
          <v-spacer />
          Tem certeza que deseja apagar?
          <v-spacer />
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialogDelete = false; deleteId = 0">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
            Apagar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" src="./Students.ts" />
