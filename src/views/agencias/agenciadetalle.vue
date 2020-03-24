<template>
  <div>
    <!-- <app-section-loader :status="loader"></app-section-loader> -->
    <v-container fluid>
      <v-toolbar :flat="true" :height="150">
        <div class>
          <div class="d-flex cust-width-max">
            <img
              :src="'https://www.rutamayatravel.com/imagenes/'+array_agencia.foto"
              class="img-responsive"
              alt
            />
          </div>
        </div>

        <v-toolbar-title>
          <h3 class="mt-2 mb-2 pl-6">{{array_agencia.nombre_agencia}}</h3>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <router-link to="/agencias/">
          <v-btn icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar>
      <v-row class="mt-0">
        <app-card
          colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 "
          customClasses="mb-0 mt-0"
        >
          <h3>Paquetes de la agencia</h3>
          <v-data-table
            :headers="headers_paquetes"
            :items="array_paquetes_agencia"
            item-key="name"
            class="elevation-1"
            :loading="loader"
            loading-text="Cargando... Espere"
          ></v-data-table>
        </app-card>
        <!--selectedProject -->
        <app-card colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12 ">
          <h3>Proximos pagos</h3>
        </app-card>
      </v-row>
    </v-container>
  </div>
</template>
<script src="./vuejs/detalleagencia.js"></script>
<style scoped>
.leaflet-container {
  z-index: 1;
}
.img-responsive {
  width: 100%;
}
.cust-width-max {
  max-width: 350px;
}
</style>