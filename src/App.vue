<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn active-class="/inventory" color="primary">Primary</v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/login" text color="black">Login/Create Account</v-btn>
    </v-app-bar>

    <v-content>
      <div id="app">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
