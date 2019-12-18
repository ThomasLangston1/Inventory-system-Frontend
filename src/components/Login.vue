<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Log In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" to="/createaccount">Create Account</v-btn>
                <v-spacer />
                <v-btn color="primary" v-on:click="verifyUser">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    verifyUser: function() {
      if (this.$data.username && this.$data.password) {
        const verifyUserURI = "https://tslinventorysystem.herokuapp.com/user/verify";
        this.$http
          .post(verifyUserURI, {
            username: this.$data.username,
            password: this.$data.password
          })
          .then(response => {
            if (response && response.data) {
              if (response.data === "Validated") {
                localStorage.setItem("userValidated", true);
                //redirect to new inventory page
                this.$router.push("inventory");
              } else {
                localStorage.setItem("userValidated", false);
              }
            }
          })
          .catch(e => {
            alert(e);
          });
      }
    }
  }
};
</script>