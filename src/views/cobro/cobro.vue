<template>
  <div>
    <v-container>
      <v-card>
        <h2 class="py-5 px-5">Modulo de cobro</h2>
        <v-container class="pl-5 pr-5 py-0">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                id="buscar_agencia"
                v-model="nombre_agencia"
                label="Buscar agencia"
                hint="Escriba el nombre de la agencia."
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                id="id_producto"
                v-model="id_producto"
                label="Buscar producto"
                append-icon="mdi-location-enter"
                hint="Presione Enter para agregar nuevo registro."
              ></v-text-field>
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
                    <v-toolbar-title>Busqueda: "{{nombre_agencia}}"</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn icon dark @click="dialog = false;" class="pt-2">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-container>
                    <h2>Reservas</h2>
                    <p>Saldo: <b>{{formatPrice(total_saldo2)}}</b></p>
                    
                    <p>Fondo: <b>{{formatPrice(total_importe2)}}</b></p>
                     <v-btn color="red" block dark @click="dialog = false; nombre_agencia = ''; unirBusquedaConPagoGrid(); precios = [];  calcularTotalBusqueda(); " class="pt-2" :disabled="precios.length == 0">
                        Agregar al pago
                      </v-btn>
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
                          <tr v-for="(data,index) in json_busqueda_agencia_reservas" :key="index" @click="calcularTotalBusqueda()">
                            <td>
                              <v-checkbox v-model="precios" :value="data" ></v-checkbox>
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
                  <v-container>
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
                            v-for="(data,index) in json_busqueda_agencia_gruposbodas"
                            :key="index" @click="calcularTotalBusqueda()"
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
                  <v-container>
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
                          <tr v-for="(data,index) in json_busqueda_agencia_bloqueos" :key="index" @click="calcularTotalBusqueda()">
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
        <v-container>
          <v-row>
            <v-col cols="6" md="8">
              <v-text-field label="Observaciones"></v-text-field>
            </v-col>
            <v-col cols="6" md="4">
              <v-text-field v-model="total" label="Total" readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="text-center py-1">
              <v-btn color="red" block dark @click="nuevaOrden()">Nueva Orden</v-btn>
            </v-col>
            <v-col cols="12" md="4" class="text-center py-1">
              <v-btn color="red" block dark>Guardar</v-btn>
            </v-col>
            <v-col cols="12" md="4" class="text-center py-1">
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