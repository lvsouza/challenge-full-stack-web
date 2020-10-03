<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <MenuBarComponent />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="spacing-playground pa-6">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import MenuBarComponent from "./components/menu-bar/MenuBarComponent.vue";

@Component({
  components: {
    MenuBarComponent,
  },
})
export default class App extends Vue {
  drawer = !this.$vuetify.breakpoint.mdAndDown
}
</script>
  