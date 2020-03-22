<template>
  <div>
    <app-section-loader :status="loader"></app-section-loader>
    <page-title-bar></page-title-bar>
    <v-container fluid>
      <div class="pa-6 project-detail-title">
        <h3 class="mb-0">{{array_bloqueo.idHotel.nombre_hotel}}</h3>
      </div>
      <v-row>
        <app-card colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 " customClasses="mb-0">
          <!-- Description Details -->
          <div class="sec-title mb-4">
            <h3>Descripcion</h3>
          </div>
          <div class="sec-content">
            <p class="mb-2 fw-bold fs-14">Titulo</p>
            <p>Subtitulo</p>
            <ul class="pl-3">
              <li>hola</li>
              <li>hola</li>
              <li>hola</li>
              <li>hola</li>
            </ul>
          </div>
        </app-card>
        <!--selectedProject -->
        <app-card colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12 ">
          <h3>Titulo 2</h3>
          <p class="mb-2 fw-bold fs-14">Subtitulo</p>
        </app-card>
      </v-row>
    </v-container>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      array_bloqueo: [],
    
    };
  },
  mounted() {
    this.loadPaquetes();
  },
  methods: {
    loadPaquetes() {
      this.loader = true;
      this.$http
        .get(
          "https://www.rutamayatravel.com/sur4/admin/apivue/grupoBodas/" +
            this.id
        )
        .then(
          function(response) {
            this.loader = false;

            this.array_bloqueo = response.data[0];
          },
          function() {
            console.log("Error");
          }
        );
    }
  }
};
</script>
