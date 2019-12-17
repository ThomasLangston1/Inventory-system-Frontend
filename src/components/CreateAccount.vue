<template>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Log In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                   <v-text-field
                   label="Username"
                   name="username"
                   prepend-icon="mdi-account"
                   type="text"
                   v-model="username"
                   />

                   <v-text-field
                   label="Name"
                   name="name"
                   type="text"
                   v-model="name"
                   />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  />

                  <v-text-field
                  id="email"
                  label="E-mail"
                  name="email"
                  prepend-icon="mdi-email"
                  type="text"
                  v-model="email"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn 
                color="primary"
                v-on:click="createUser"
                >Create Account</v-btn>
                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
    name: 'CreateAccount',

  data() {
    return {
      username: null,
      email: null,
      password: null,
      name: null
      
    };
  },
  methods: {
    createUser: function() {
      if (this.$data.username && this.$data.password 
         && this.$data.email && this.$data.name) {
        const CreateUserURI = "http://127.0.0.1:5000/user/create";
        this.$http
          .post(CreateUserURI, {
            username: this.$data.username,
            password: this.$data.password,
            email: this.$data.email,
            name: this.$data.name
          })
          .then(response => {
            if (response && response.data) {
              if (response.data === "User Created") {
                localStorage.setItem("userCreated", true);
                //redirect to new inventory page
                this.$router.push('login');
              } else {
                localStorage.setItem("userCreated", false);
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