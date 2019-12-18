<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/mountainMan.jpg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to my capstone!</h1>
      </v-flex>

      <v-flex xs12 mb-5>
        <h1>Description</h1>
      </v-flex>

      <v-flex xs12 mb-5>
        <p>
          My project is based off of a Warehouse Inventory Management System.
          This is designe to allow a company to have employees to create a user so that they can access the products that are stored inside of the warehouse.
          The employee can then see the product that they are looking for and see where it is located.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({})
};
</script>
