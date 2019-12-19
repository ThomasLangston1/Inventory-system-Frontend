<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn v-if="this.$store.getters.loggedIn" @click="logOut" text color="black">Logout</v-btn>
      <v-btn v-else to="/login" text color="black">Login/Create Account</v-btn>
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
  methods: {
    logOut: function() {
      this.$store.commit('logout');
      if(this.$router.currentRoute.path !== "/login"){
        this.$router.push("login");
      }
    }
  }
};
</script>
