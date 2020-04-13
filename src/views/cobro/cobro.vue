<template>
  <div>
    <v-container>
      <v-card>
        <h2 class="py-5 px-5">MODULO DE COBRO</h2>
        <v-container class="pl-5 pr-5 py-0">
          <v-row>
            <v-col cols="10" md="5">
              <v-autocomplete
                v-model="model_agencia_selected"
                :items="listaAgencias"
                :loading="isLoading"
                :search-input.sync="search"
                clearable
                hide-selected
                item-text="nombre_agencia"
                item-value="id_agencia"
                label="BUSCAR AGENCIA"
                hint="ESCRIBA MAS DE 3 LETRAS..."
                prepend-icon="mdi-search"
                no-data-text="ESCRIBA MAS DE 3 LETRAS..."
                return-object
                @click="mostrarBotonBusqueda = true;"
              >
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="URLIMG + data.item.foto" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="data.item.nombre_agencia"></v-list-item-title>
                      <v-list-item-subtitle v-text="data.item.nombre_estado"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="2" md="1">
              <v-btn
                color="primary"
                dark
                class="mt-4"
                v-if="mostrarBotonBusqueda"
                @click="abrirModal();  precios = []; array_busqueda_agencia = []"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                id="id_producto"
                v-model="id_producto"
                label="BUSCAR PRODUCTO"
                v-on:keyup.13="peticionTest()"
                append-icon="mdi-location-enter"
              ></v-text-field>
              <!-- <div v-html="msjError" style="font-size:12px; color:red;" class="py-0"></div> -->
            </v-col>
            <v-col cols="12" md="1">
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card>
                  <v-toolbar dark color="pink">
                    <v-toolbar-title>{{nombre_agencia}} - ID: {{id_agencia}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn
                        icon
                        dark
                        @click="dialog = false; nombre_agencia = ''; precios = [];  calcularTotalBusqueda(); array_busqueda_agencia = []; mostrarBotonBusqueda = true;"
                        class="pt-0"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>

                  <v-container>
                    <h2>RESERVAS</h2>
                    <p>
                      SALDO SELECCIONADO:
                      <b>$ {{$RMT.formatoPrecio(total_saldo2)}}</b>

                      <v-btn
                        color="red"
                        normal
                        dark
                        @click="dialog = false; nombre_agencia = ''; unirBusquedaConPagoGrid(); precios = [];  calcularTotalBusqueda(); array_busqueda_agencia = [] "
                        class="float-right"
                        :disabled="precios.length == 0"
                      >Agregar al pago</v-btn>
                    </p>
                    <v-sheet color="grey" class="pa-0" v-show="loader == true">
                      <v-skeleton-loader class="mx-auto" max-width="auto" type="table" tile></v-skeleton-loader>
                    </v-sheet>
                    <v-simple-table :fixed-header="true" height="200" v-show="loader == false">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">IDENTIFICADOR</th>
                            <th class="text-left">SALDO</th>
                            <th class="text-left">IMPORTE</th>
                            <th class="text-left">TIPO</th>
                            <th class="text-left">DESCRIPCION</th>
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(data,index) in array_busqueda_agencia.Reservas"
                            :key="index"
                            @click="calcularTotalBusqueda()"
                            v-show="index !== 'importeTotal' && index !== 'saldoTotal'"
                          >
                            <td>{{data.identificador}}</td>
                            <td>$ {{$RMT.formatoPrecio(data.saldo)}}</td>
                            <td>$ {{$RMT.formatoPrecio(data.importe)}}</td>
                            <td>{{data.tipo}}</td>
                            <td>{{data.descripcion}}</td>
                            <td>
                              <v-checkbox v-model="precios" :value="data"></v-checkbox>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-container>
                  <v-container>
                    <h2>GRUPOS Y BODAS</h2>

                    <v-sheet color="grey" class="pa-0" v-show="loader == true">
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="auto"
                        type="table"
                        :tile="false"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-simple-table :fixed-header="true" height="200" v-show="loader == false">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">IDENTIFICADOR</th>
                            <th class="text-left">SALDO</th>
                            <th class="text-left">IMPORTE</th>
                            <th class="text-left">TIPO</th>
                            <th class="text-left">DESCRIPCION</th>
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(data,index) in array_busqueda_agencia.GruposBodas"
                            :key="index"
                            @click="calcularTotalBusqueda()"
                            v-show="index !== 'importeTotal' && index !== 'saldoTotal'"
                          >
                            <td>{{data.identificador}}</td>
                            <td>$ {{$RMT.formatoPrecio(data.saldo)}}</td>
                            <td>$ {{$RMT.formatoPrecio(data.importe)}}</td>
                            <td>{{data.tipo}}</td>
                            <td>{{data.descripcion}}</td>
                            <td>
                              <div class="d-flex">
                                <v-checkbox v-model="precios" :value="data"></v-checkbox>
                                <v-btn
                                  icon
                                  light
                                  class="mt-4"
                                  @click="dialog_habitaciones = true; modal_habitaciones(data); modelo_habitaciones = []; array_cuartos_busqueda = []; loaderHabitaciones = true;"
                                >
                                  <v-icon class="ma-0">mdi-open-in-new</v-icon>
                                </v-btn>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-container>
                  <v-container>
                    <h2>Bloqueos</h2>

                    <v-sheet color="grey" class="pa-0" v-show="loader == true">
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="auto"
                        type="table"
                        :tile="false"
                      ></v-skeleton-loader>
                    </v-sheet>
                    <v-simple-table :fixed-header="true" height="200" v-show="loader == false">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">IDENTIFICADOR</th>
                            <th class="text-left">SALDO</th>
                            <th class="text-left">IMPORTE</th>
                            <th class="text-left">TIPO</th>
                            <th class="text-left">DESCRIPCION</th>
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(data,index) in array_busqueda_agencia.Bloqueos"
                            :key="index"
                            @click="calcularTotalBusqueda()"
                            v-show="index !== 'importeTotal' && index !== 'saldoTotal'"
                          >
                            <td>{{data.identificador}}</td>
                            <td>{{$RMT.formatoPrecio(data.saldo)}}</td>
                            <td>{{$RMT.formatoPrecio(data.importe)}}</td>
                            <td>{{data.tipo}}</td>
                            <td>{{data.descripcion}}</td>
                            <td>
                              <v-checkbox v-model="precios" :value="data"></v-checkbox>
                            </td>
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
        <v-simple-table class="py-0" :fixed-header="true" height="450">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center" style="text-align:center !important;">TIPO</th>
                <th class="text-center" style="text-align:center !important;">IDENTIFICADOR</th>
                <th class="text-center" style="text-align:center !important;">DESCRIPCION</th>

                <th class="text-center" style="text-align:center !important;">IMPORTE</th>
                <th class="text-center" style="text-align:center !important;">SALDO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data,index) in json_busqueda_prueba" :key="data.identificador">
                <td>{{ data.tipo_producto }}</td>
                <td>{{ data.identificador }}</td>
                <td>{{ data.descripcion }}</td>
                <td
                  class="text-right"
                  style="width: 200px !important;"
                >$ {{ $RMT.formatoPrecio(data.importe) }}</td>
                <td
                  style="width: 200px !important; text-align:right !important"
                  v-show="!switchInput"
                  @click="switchInputEvent();"
                >$ {{$RMT.formatoPrecio(data.saldo)}}</td>

                <td
                  style="width: 200px !important; text-align:right !important"
                  v-show="switchInput"
                >
                  <v-text-field
                    prefix="$"
                    v-model.lazy="data.saldo"
                    @keypress="isNumber($event);"
                    @change="pruebaGetInfoInputMain(index);"
                    suffix="MX"
                  />
                </td>

                <td>
                  <v-btn icon light class="mt-0" @click="eliminarReserva(index)">
                    <v-icon class="ma-0">mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">Total:</td>
                <td style="text-align:right !important">$ {{$RMT.formatoPrecio(total_importe)}}</td>
                <td style="text-align:right !important">$ {{$RMT.formatoPrecio(total_saldo)}}</td>
                <td></td>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>

        <v-row class="pl-2 pr-2 py-0">
          <v-col cols="6" md="8">
            <v-text-field label="OBSERVACIONES" v-model="observacion"></v-text-field>
          </v-col>
          <v-col cols="6" md="4">
            <p
              class="text-right"
              style="font-size:24px !important; font-weight:700 !important;"
            >{{'$ '+$RMT.formatoPrecio(total_saldo)}}</p>
          </v-col>
        </v-row>

        <v-row class="pl-2 pr-2 py-0">
          <v-col cols="2" md="2" class="text-center">
            <v-btn color="primary" block dark @click="nuevaOrden()">Nueva Orden</v-btn>
          </v-col>
          <v-col cols="6" md="6"></v-col>
          <v-col cols="2" md="2" class="text-center">
            <v-btn color="green" block dark @click="dialog_confirmar_guardar= true; ">Guardar</v-btn>
          </v-col>
          <v-col cols="2" md="2" class="text-center">
            <v-btn color="green" block dark @click="dialog_guardar_pagar = true;">Guardar y Pagar</v-btn>
          </v-col>
        </v-row>
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

    <v-dialog v-model="dialog_habitaciones" max-width="500px">
      <v-card>
        <v-card-title>Lista de Cuartos</v-card-title>
        <p class="pl-6">Has seleccionado: {{modelo_habitaciones.length}}</p>
        {{modelo_habitaciones.identificador}}
        <div v-for="(data,i) in 5" :key="i" v-show="loaderHabitaciones == true">
          <v-skeleton-loader ref="skeleton" :type="'list-item-avatar-three-line'" class="mx-auto"></v-skeleton-loader>
        </div>
        <v-expansion-panels accordion v-show="loaderHabitaciones == false">
          <v-expansion-panel v-for="(cuarto, index) in array_cuartos_busqueda" :key="'hab_'+index">
            <v-expansion-panel-header>
              <v-checkbox
                v-model="modelo_habitaciones"
                :value="cuarto"
                @change="agregarHabAOrden(cuarto)"
                class="pa-0"
                :label="'Id:' + cuarto.identificador +' | ' +  'Hab. '+ cuarto.habitacion + ' | ' + 'Saldo: $ ' + $RMT.formatoPrecio(cuarto.saldo)"
              ></v-checkbox>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <h5>{{cuarto.nombrePax}}</h5>
              <h5>{{cuarto.menoresPax}}</h5>
              <h5>
                <p>{{cuarto.fecha_inicial}} - {{cuarto.fecha_final}}</p>
              </h5>
              <p>$ {{cuarto.descripcion}}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- <v-card-actions>
          <v-btn color="red" text @click="dialog_habitaciones = false; modelo_habitaciones = []; array_cuartos_busqueda = [];">Cerrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>-->
      </v-card>
    </v-dialog>

    <!-- dialogo guardar y pagar -->
    <v-dialog
      v-model="dialog_guardar_pagar"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="pink">
          <v-toolbar-title>GUARDAR Y PAGAR</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dialog_guardar_pagar = false;" class="pt-0">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn icon dark @click="dialog_guardar_pagar = false;" class="pt-0">
              <v-icon>mdi-close</v-icon>
            </v-btn>cart-arrow-down
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <h2>Metodo de pagos</h2>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Dialogo guardar confirmar -->
    <v-dialog v-model="dialog_confirmar_guardar" max-width="290">
      <v-card>
        <v-card-title class="headline">¿Estas seguro de guardar el pago?</v-card-title>

        <v-card-text>Esta a punto de guardar el pago.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog_confirmar_guardar = false">CANCELAR</v-btn>

          <v-btn color="green darken-1" dark @click="crearOrdenPago();">GUARDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>
<script src="./vuejs/cobro.js"></script>

<style scoped>
table {
  table-layout: fixed !important;
  width: auto !important;
}
table td {
  white-space: normal !important;
}
tfoot,
tfoot th,
tfoot td {
  position: -webkit-sticky !important;
  position: sticky !important;
  bottom: 0 !important;
  background: #fff;
  z-index: 4 !important;
}
</style>