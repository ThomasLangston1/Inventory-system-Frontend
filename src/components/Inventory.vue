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
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Current Inventory</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">New Inventory Item</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Weight"
                        name="weight"
                        prepend-icon="mdi-weight"
                        type="text"
                        v-model="weight"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Name"
                        name="name"
                        prepend-icon="mdi-file"
                        type="text"
                        v-model="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Location"
                        name="location"
                        prepend-icon="mdi-pin"
                        type="text"
                        v-model="location"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="createItem">Create Item</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
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
      dialog: false,
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Weight", value: "weight", sortable: true },
        { text: "Location", value: "location", sortable: true },
        { text: "Actions", value: "action", sortable: false}
      ],
      inventoryItems: []
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    createItem: function() {
      const CreateItemURI = "https://tslinventorysystem.herokuapp.com/item/create";
      //create item
      this.$http
        .post(CreateItemURI, {
          name: this.$data.name,
          weight: this.$data.weight,
          location: this.$data.location
        })
        .then(() => {
          this.$data.dialog = false;
        })
      //run getItems
      .finally(() => {
        this.getItems()
      })
    },
    getItems: function() {
      this.$data.loadingItems = true;
      const GetItemURI = "https://tslinventorysystem.herokuapp.com/item/get";
      this.$http
        .get(GetItemURI)
        .then(response => {
          if (response && response.data) {
            this.$data.inventoryItems = response.data;
          }
        })
        .catch(e => {
          alert(e);
        })
        .finally(() => {
          this.$data.loadingItems = false;
        });
    },
    deleteItem: function(item) {
      if(item && item.id){
      this.$data.loadingItems = true;
      const DeleteItemURI = `https://tslinventorysystem.herokuapp.com/item/delete/${item.id}`;
      //call out
      this.$http
      .delete(DeleteItemURI,{
        id: this.$data.id
      }).finally(() => {
        this.getItems() 
      }) 
      }
     },
    closeDialog: function() {
      this.$data.dialog = false;
    }
  }
};
</script>