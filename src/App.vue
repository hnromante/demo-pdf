<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <p>Prueba de concepto</p>
      <v-spacer></v-spacer>
      <router-link class="anchor" to="/pixi">PIXI</router-link>
      <v-spacer></v-spacer>
      <router-link class="anchor" to="/canvas">CANVAS</router-link>
    </v-app-bar>
    <v-main>
    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {
  },

  data: () => ({
    //
  })
});
</script>
