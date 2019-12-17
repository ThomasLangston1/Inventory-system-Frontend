<template>
  <v-container>
    <v-card
    class="d-flex pa-2"
    outlined
    tile
    width:auto
    height: auto
    >
        <v-data-table 
        :headers="headers" 
        :items="inventoryItems" 
        :items-per-page="25" 
        :loading="loadingItems"
        loading-text="Loading... please wait for items"
        class="elevation-1">
        </v-data-table>
        <v-spacer></v-spacer>
        <v-form>
        <v-text-field
            label="Name"
            name="name"
            prepend-icon="mdi-file"
            type="text"
            v-model="name"
        />

        <v-text-field
            label="Weight"
            name="weight"
            prepend-icon="mdi-weight"
            type="text"
            v-model="weight"
        />

        <v-text-field
            label="Location"
            name="location"
            prepend-icon="mdi-pin"
            type="text"
            v-model="location"
        />
        <v-btn v-on:click="createItem">Create Item</v-btn>
        </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "inventory",

  data() {
    return {
      name: null,
      weight: null,
      location: null,
      loadingItems: true,
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Weight", value: "weight", sortable: true },
        { text: "Location", value: "location", sortable: true }
      ],
      inventoryItems: []
    };
  },
  mounted() {
      this.getItems();
  },
  methods: {
    createItem: function() {
      const CreateItemURI = "http://127.0.0.1:5000/item/create";
      //create item
      this.$http.post(CreateItemURI, {
        name: this.$data.name,
        weight: this.$data.weight,
        location: this.$data.location
      })
      //run getItems
      this.getItems();
    },
    getItems: function() {
      this.$data.loadingItems = true;
      const GetItemURI = "http://127.0.0.1:5000/item/get";
      this.$http
        .get(GetItemURI)
        .then(response => {
          if (response && response.data) {
              //resp
            this.$data.inventoryItems = response.data;
          }
        })
        .catch(e => {
          alert(e);
        })
        .finally(() => {
            this.$data.loadingItems = false;
        });
    }
  }
};
</script>