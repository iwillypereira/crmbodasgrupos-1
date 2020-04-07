<template>
  <div>
    <v-container>
      <v-card>
        <h2 class="py-5 px-5">Modulo de cobro</h2>
        <v-container class="pl-5 pr-5 py-0">
          <v-row>
            <v-col cols="12" md="6">
              <!-- <v-text-field
                id="buscar_agencia"
                v-model="nombre_agencia"
                label="Buscar agencia"
                hint="Escriba el nombre de la agencia."
              ></v-text-field>-->
              <multiselect
                v-model="selected_agencia"
                :options="listaAgencias"
                track-by="id_agencia"
                label="nombre_agencia"
                placeholder="Buscar Agencia"
                open-direction="bottom"
                :searchable="true"
                :loading="isLoading"
                :internal-search="false"
                :clear-on-select="false"
                :close-on-select="true"
                :options-limit="50"
                @search-change="asyncFind"
                :preserve-search="true"
                :show-labels="false"
                autocomplete="off"
                @select="abrirModal"
                class="pt-3"
              >
                <template slot="tag" slot-scope="{ option, remove }">
                  <span class="custom__tag">
                    <span>{{ option.nombre_agencia }}</span>
                    <span class="custom__remove" @click="remove(option)">❌</span>
                  </span>
                </template>
                <span
                  slot="noResult"
                >Oops! No se encontraron resultados. Considere cambiar la búsqueda.</span>
                <span slot="noOptions">No hay agencia seleccionada.</span>
              </multiselect>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                id="id_producto"
                v-model="id_producto"
                label="Buscar producto"
                append-icon="mdi-location-enter"
              ></v-text-field>
              <div v-html="msjError" style="font-size:12px; color:red;" class="py-0"></div>
            </v-col>
            <v-col cols="10" md="1">
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card>
                  <v-toolbar dark color="pink">
                    <v-toolbar-title>Busqueda: "{{nombre_agencia}} - {{id_agencia}}"</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn
                        icon
                        dark
                        @click="dialog = false; array_busqueda_agencia = []"
                        class="pt-2"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-container v-show="array_busqueda_agencia.Reservas != null">
                    <h2>Reservas</h2>
                    <p>
                      Saldo:
                      <b>$ {{formatPrice(total_saldo2)}}</b>
                      | Importe:
                      <b>$ {{formatPrice(total_importe2)}}</b>
                      | Fondo:
                      <b>$ 0.00</b>
                    </p>

                    <v-btn
                      color="red"
                      block
                      dark
                      @click="dialog = false; nombre_agencia = ''; unirBusquedaConPagoGrid(); precios = [];  calcularTotalBusqueda(); array_busqueda_agencia = [] "
                      class="pt-2"
                      :disabled="precios.length == 0"
                    >Agregar al pago</v-btn>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Accion</th>
                            <th class="text-left">identificador</th>
                            <th class="text-left">saldo</th>
                            <th class="text-left">importe</th>
                            <th class="text-left">tipo</th>
                            <th class="text-left">descripcion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(data,index) in array_busqueda_agencia.Reservas"
                            :key="index"
                            @click="calcularTotalBusqueda()"
                          >
                            <td>
                              <v-checkbox v-model="precios" :value="data"></v-checkbox>
                            </td>
                            <td>{{data.identificador}}</td>
                            <td>$ {{formatPrice(data.saldo)}}</td>
                            <td>$ {{formatPrice(data.importe)}}</td>
                            <td>{{data.tipo}}</td>
                            <td>{{data.descripcion}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-container>
                  <v-container v-show="array_busqueda_agencia.GruposBodas != null">
                    <h2>Grupos y Bodas</h2>

                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Accion</th>
                            <th class="text-left">identificador</th>
                            <th class="text-left">saldo</th>
                            <th class="text-left">importe</th>
                            <th class="text-left">tipo</th>
                            <th class="text-left">descripcion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(data,index) in array_busqueda_agencia.GruposBodas"
                            :key="index"
                            @click="calcularTotalBusqueda()"
                          >
                            <td>
                              <v-checkbox v-model="precios" :value="data"></v-checkbox>
                            </td>
                            <td>{{data.identificador}}</td>
                            <td>{{data.saldo}}</td>
                            <td>{{data.importe}}</td>
                            <td>{{data.tipo}}</td>
                            <td>{{data.descripcion}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-container>
                  <v-container v-show="array_busqueda_agencia.Bloqueos != null">
                    <h2>Bloqueos</h2>

                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Accion</th>
                            <th class="text-left">identificador</th>
                            <th class="text-left">saldo</th>
                            <th class="text-left">importe</th>
                            <th class="text-left">tipo</th>
                            <th class="text-left">descripcion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(data,index) in array_busqueda_agencia.Bloqueos"
                            :key="index"
                            @click="calcularTotalBusqueda()"
                          >
                            <td>
                              <v-checkbox v-model="precios" :value="data"></v-checkbox>
                            </td>
                            <td>{{data.identificador}}</td>
                            <td>{{data.saldo}}</td>
                            <td>{{data.importe}}</td>
                            <td>{{data.tipo}}</td>
                            <td>{{data.descripcion}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-simple-table class="pa-0">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Accion</th>
                <th class="text-left">Tipo</th>
                <th class="text-left">Identificador</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Saldo</th>
                <th class="text-left">Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data,index) in json_busqueda_prueba" :key="data.identificador">
                <td>
                  <v-btn rounded color="red" dark @click="eliminarReserva(index)">X</v-btn>
                </td>
                <td>{{ data.tipo }}</td>
                <td>{{ data.identificador }}</td>
                <td>{{ data.descripcion }}</td>
                <td>$ {{ formatPrice(data.saldo) }}</td>
                <td>$ {{ formatPrice(data.importe) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-right">
                  <b>Total:</b>
                </td>
                <td>$ {{formatPrice(total_saldo)}}</td>
                <td>$ {{formatPrice(total_importe)}}</td>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
        Order de pago
        {{array_test}}
        <v-container>
          <v-row>
            <v-col cols="6" md="8">
              <v-text-field label="Observaciones" v-model="observacion"></v-text-field>
            </v-col>
            <v-col cols="6" md="4">
              <v-text-field label="Total" :value="'$ '+formatPrice(total_saldo)" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row class="d-flex flex-row-reverse">
            <v-col cols="4" md="2" class="text-center py-1">
              <v-btn color="red" block dark @click="nuevaOrden()">Nueva Orden</v-btn>
            </v-col>
            <v-col cols="4" md="2" class="text-center py-1">
              <v-btn color="red" block dark @click="crearOrdenPago()">Guardar</v-btn>
            </v-col>
            <v-col cols="4" md="2" class="text-center py-1">
              <v-btn color="red" block dark>Pagar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{text}}
      <v-btn dark text @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script src="./vuejs/cobro.js"></script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.multiselect__single {
  padding: 20px 0 29px 40px;
}
.multiselect__content-wrapper {
  width: auto;
  min-width: 100%;
}
.multiselect__option--highlight {
  background: #57b2ce;
}
.multiselect__option--disabled {
  color: #393737;
  font-weight: 700;
}
.multiselect__select:before {
  position: relative;
  right: 0;
  top: 103% !important;
  color: #999;
  margin-top: 4px;
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 0;
  content: "";
}
</style>