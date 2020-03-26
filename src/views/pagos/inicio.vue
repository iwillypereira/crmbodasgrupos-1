<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="array_proximos_pagos"
        :search="search"
        item-key="name"
        class="elevation-1"
        :loading="loader"
        loading-text="Cargando... Espere"
      ></v-data-table>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loader: true,
      array_proximos_pagos: [],
      search: '',
      headers: [
        {
          text: "Bloqueo",
          align: "start",
          value: "id_bloqueo",
          sortable: true
        },
        { text: "Hotel", value: "id_hotel", sortable: true },
        { text: "observacion", value: "observacion", sortable: true },
        { text: "Inico", value: "fecha_inicio", sortable: true },
        { text: "Final", value: "fecha_final", sortable: true },
        { text: "Importe", value: "importe", sortable: true },
        { text: "tipo", value: "tipo", sortable: true }
      ]
    };
  },
  mounted() {
    this.getProjectData();
  },
  methods: {
    getProjectData() {
      this.loader = true;
      this.$http
        .get(
          "https://www.rutamayatravel.com/sur4/admin/apivue/ListaProximosPagos"
        )
        .then(
          function(response) {
            this.array_proximos_pagos = response.data;
            console.log(this.array_proximos_pagos);
            this.loader = false;
          },
          function() {
            console.log("Error");
          }
        );
    }
  }
};
</script>
