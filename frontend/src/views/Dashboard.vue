<template>
  <v-container>
    <v-card class="pa-0" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"> Alunos </v-list-item-title>
          <v-list-item-subtitle>
            Consultar ou adicionar novos alunos
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="60">
          <v-icon large color="primary"> mdi-book </v-icon>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined text link to="/alunos/0" color="primary">
          Adicionar
        </v-btn>
        <v-btn outlined text link to="/alunos">
          Listagem de alunos
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default {
  components: {},
};
</script>
