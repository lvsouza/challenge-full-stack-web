<template>
  <v-list dense nav>
    <v-img contain height="50px" src="./../../assets/grupo-a-logo.png"></v-img>

    <br />

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Módulo acadêmico </v-list-item-title>
        <v-list-item-subtitle> Edtech </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";

export default {
  data() {
    return {
      items: [
        { title: "Página inicial", icon: "mdi-view-dashboard", path: "/" },
        { title: "Alunos", icon: "mdi-book", path: "/alunos" },
      ],
    };
  },
};
</script>
