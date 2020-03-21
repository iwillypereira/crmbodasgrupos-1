<template>
  <div class="app-card-content pt-0">
    <div class="desc-wrap" v-if="managementData.idTarifa.precio =='BODA'">
      <h6>Novios :</h6>
      <p>{{ managementData.novios }}</p>
    </div>
    <div class="desc-wrap">
      <h6>Habitaciones :</h6>
      <p>{{managementData.numero_habitaciones}}</p>
    </div>
    <div class="desc-wrap">
      <h6>Tipo de Habitación :</h6>
      <p>{{managementData.idTipoHabitacion.tipo_habitacion}}</p>
    </div>
    <!-- <div class="mb-4 project-team">
         <h6>Team Members :</h6>
         <div>
            <img class="img-circle thumb-gap rounded-circle" width="30px" height="30px" 
               v-for="(img,index) in managementData.teamImage" :key="index"
               :src="img"/>            
         </div>
      </div>   
      <div class="deadline-info mb-4">
         <h6>Deadline :</h6>
         <p>{{ managementData.deadline }}</p>
    </div>-->
    <div class="progress-bar mb-5">
      <h6 class="v-input__prepend-outer mb-5">Progress : {{ managementData.progressValue }} %</h6>
      <div class="d-flex justify-space-between text-center pa-0">
        <v-progress-linear v-model="managementData.progressValue" color="primary" height="7"></v-progress-linear>
      </div>
    </div>
    <div class="button-wrap text-right">
      <v-btn
        color="primary"
        medium
        :to="`/${getCurrentAppLayoutHandler() + '/bodasygrupos/bloqueo/'+ managementData.id_bloqueo}`"
      >Ver más</v-btn>
    </div>
  </div>
</template>
<script>
// import api from "Api";
import { getCurrentAppLayout } from "Helpers/helpers";

export default {
  props: ["managementData"],
  data() {
    return {};
  },
  methods: {
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    }
  }
};
</script>