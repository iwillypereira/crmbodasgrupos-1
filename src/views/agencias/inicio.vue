<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid>
      <v-row>
        <v-row v-if="usersList !== null">
          <app-card
            colClasses="col-12 col-sm-6 col-md-4"
            v-for="(agencia, index) in busquedaAgencia"
            :key="index"
          >
            <div class="user-image text-sm-center mb-4">
              <img
                :src="'https://www.rutamayatravel.com/imagenes/'+agencia.foto"
                class="img-responsive rounded-circle"
                alt="user images"
                width="95"
                height="95"
              />
            </div>
            <div class="user-list-content">
              <div class="text-center">
                <h3 class="fw-bold">{{agencia.nombre_agencia}}</h3>
                <p>{{ agencia.contacto }}</p>
                <p>{{agencia.email_agencia}}</p>
                <!-- <div class="social-list clearfix mb-5">
                  <ul class="list-inline d-inline-block">
                    <li v-for="(links, index) in users.socialLinks" :key="index">
                      <a :href="links.url" class="text-pink">
                        <i :class="links.icon"></i>
                      </a>
                    </li>
                  </ul>
                </div>-->
              </div>
              <!-- <div class="layout justify-space-between border-tb-1 pa-2 mb-4">
                <div class="align-item-start">
                  <span>{{$t("message.connections")}}</span>
                </div>
                <div class="align-item-end">
                  <ul class="list-inline">
                    <li class="pa-0" v-for="(user, index) in users.connections" :key="index">
                      <img
                        :src="getImgSrc(user)"
                        alt="user images"
                        class="rounded-circle"
                        width="24"
                        height="24"
                      />
                    </li>
                  </ul>
                </div>
              </div>-->
              <!-- <a
                class="v-btn btn-success white--text ma-0 px-3 py-2 fs-14"
                href="javascript:void(0);"
                @click="users.status = !users.status"
                v-if="users.status"
              >{{$t("message.follow")}}</a>
              <a
                class="v-btn btn-danger white--text ma-0 px-3 py-2 fs-14"
                href="javascript:void(0);"
                @click="users.status = !users.status"
                v-else 
              >{{$t("message.unfollow")}}</a>-->
            </div>
          </app-card> 
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>
<script src="./index.js"></script>