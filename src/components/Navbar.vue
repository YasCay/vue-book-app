<template>
  <v-app-bar color="#1EE8A3" app>
    <router-link to="/">
      <v-btn depressed text>Home</v-btn>
    </router-link>
    <router-link to="/search" class="v-btn v-btn--text">
      <v-btn depressed text>Search</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>
