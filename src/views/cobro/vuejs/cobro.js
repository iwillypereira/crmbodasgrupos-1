import $ from 'jquery';
import Multiselect from "vue-multiselect";
export default {
    components: {
        Multiselect
    },
    data() {
        return {
            RMTURL: 'https://www.rutamayatravel.com/sur4dev/admin/',
            nombre_agencia: '',
            id_agencia: '',
            observacion: null,
            id_producto: '',
            dialog: false,

            selected_agencia: "",
            listaAgencias: [],
            isLoading: false,
            idAgencia: "",

            total_saldo: 0,
            total_importe: 0,
            total_saldo2: 0,
            total_importe2: 0,
            total: 0,
            array_temp_producto: {},
            json_busqueda_prueba: [],
            array_busqueda_agencia: [],           
            precios: [],
            //variables del mensaje
            color: '',
            mode: '',
            snackbar: false,
            text: 'Hello, I\'m a snackbar',
            timeout: 6000,
            x: null,
            y: 'top',


            settings: [],
            msjError: '',
            array_test: {}
        }
    },
    created() {

    },
    mounted() {
        this.MetodosInit();
    },
    methods: {
        MetodosInit() {
            var that = this;
            $("#id_producto").keypress(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {

                    that.peticionTest();

                }
            });


        },
        formatPrice(value) {
            var redondear = Math.ceil(value);
            let val = (redondear / 1).toFixed(2).replace(',', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        redondearArriba(value) {
            var redondear = Math.ceil(value);

            return redondear;
        },
        agregarReserva() {

            this.json_busqueda_prueba.push({
                'identificador': this.array_temp_producto.search.identificador,
                'saldo': this.array_temp_producto.search.saldo,
                'importe': this.array_temp_producto.search.importe,
                'tipo': this.array_temp_producto.search.tipo,
                'descripcion': this.array_temp_producto.search.descripcion
            });
            this.limpiarBusquedas();
            this.calcularTotalSaldo();
            // this.calcularTotalBusqueda();
            // console.log(this.json_busqueda_prueba);
        },
        eliminarReserva(index) {
            this.json_busqueda_prueba.splice(index, 1);
            this.calcularTotalSaldo();
            this.mensaje("Se ha eliminado con exito!", 'red');
        },
        calcularTotalSaldo() {
            this.total_saldo = 0;
            this.total_importe = 0;
            this.json_busqueda_prueba.forEach(reserva => {
                this.total_saldo = (parseFloat(this.total_saldo) + parseFloat(reserva.saldo));
                this.total_importe = (parseFloat(this.total_importe) + parseFloat(reserva.importe));
            });

        },
        nuevaOrden() {
            this.limpiarTabla();
        },
        limpiarTabla() {
            this.json_busqueda_prueba = [];
            
            this.array_test = [];
            this.calcularTotalSaldo();
            this.mensaje("Se ha eliminado con exito!", 'red');
        },
        limpiarBusquedas() {
            this.nombre_agencia = '';
            this.id_producto = '';
        },
        mensaje(texto, color) {
            this.color = color;
            this.mode = 'multi-line';
            this.snackbar = true;
            this.text = texto;
            this.timeout = 1000;
            this.x = 'right';
            this.y = 'bottom';
        },
        calcularTotalBusqueda() {
            this.total_importe2 = 0;
            this.total_saldo2 = 0;

            this.precios.forEach(reserva => {
                this.total_saldo2 = this.total_saldo2 + parseFloat(reserva.saldo);
                this.total_importe2 = this.total_importe2 + parseFloat(reserva.importe);
            });


        },
        unirBusquedaConPagoGrid() {
            var that = this;

            this.precios.forEach(element => {
                that.json_busqueda_prueba.push(element);
            });
            this.calcularTotalSaldo();
        },
        asyncFind(query) {
            this.isLoading = true;
            if (query.length > 0) {
                this.isLoading = true;
                this.$http
                    .get(
                        "https://www.rutamayatravel.com/sur4/admin/produccionesVentas/busquedaAgencias?search=" +
                        query,
                        {
                            before(request) {
                                // abort previous request, if exists
                                if (this.previousRequest) {
                                    this.previousRequest.abort();
                                }
                                // set previous request on Vue instance
                                this.previousRequest = request;
                            }
                        }
                    )
                    .then(
                        function (response) {
                            var response_var = response.body;
                            this.listaAgencias = response_var;
                            // console.log(this.listaAgencias);
                            //   if (this.limit_options == 20) this.limit_options = 30;
                            this.isLoading = false;
                        },
                        function () {
                            console.log("Error");
                        }
                    );
            }
        },
        abrirModal(query) {
            this.dialog = true;
            this.nombre_agencia = query.nombre_agencia;
            this.id_agencia = query.id_agencia;

            this.$http.get("https://www.rutamayatravel.com/sur4dev/admin/contabilidad/ordenPago/SearchAll/" + this.id_agencia).then(function (response) {
                this.array_busqueda_agencia = response.body.search;
                console.log(this.array_busqueda_agencia);
               
            },
                function () {
                    console.log("Error");
                }
            );



        },
        peticionTest() {

            this.$http
                .get(this.RMTURL + "contabilidad/ordenPago/search?identificador=" + this.id_producto).then(function (response) {
                    this.array_temp_producto = response.body;
                    // console.log(this.array_temp_producto);

                    if (this.array_temp_producto.empty == "No ingreso algun código de busqueda") {
                        this.msjError = "<p>" + this.array_temp_producto.empty + "</p>";
                    } else if (this.array_temp_producto.empty == '') {
                        if (this.array_temp_producto.search.error != '') {
                            this.msjError = "<p>" + this.array_temp_producto.search.error + "</p>";

                        } else {
                            this.agregarReserva();

                            this.mensaje("Se agregó con exito", 'green');
                        }

                    }
                },
                    function () {
                        console.log("Error");
                        this.msjError = "Hubo un error";
                    }
                );
        },
        crearOrdenPago() {

            this.calcularTotalSaldo();

            if (this.json_busqueda_prueba.length > 0) {
                this.array_test = {
                    'OrdenPago': {
                        "id_usuario": 456,
                        "id_agencia": 9,
                        "importe_total": this.total_saldo,
                        "observaciones": this.observacion
                    },
                    'OrdenPagoDetalles': this.json_busqueda_prueba,
                };
                console.log(this.array_test);
            }



        }

    },
};