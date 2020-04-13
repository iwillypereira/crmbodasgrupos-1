// import $ from 'jquery';
export default {
    data() {
        return {
            RMTURL: 'https://www.rutamayatravel.com/sur4dev/admin/',
            URLIMG: 'https://www.rutamayatravel.com/imagenes/',
            busquedaReservastxt: '',
            busquedaGruposBodatxt: '',
            busquedaBloqueotxt: '',
            nombre_agencia: '',
            id_agencia: '',
            observacion: null,
            id_producto: '',
            dialog: false,
            dialog_habitaciones: false,
            dialog_guardar_pagar: false,
            dialog_confirmar_guardar: false,
            modelo_habitaciones: [],

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
            loader: true,
            //variables del mensaje
            color: '',
            mode: '',
            snackbar: false,
            text: 'Hello, I\'m a snackbar',
            timeout: 6000,
            x: null,
            y: 'top',
            mostrarBotonBusqueda: true,

            loaderHabitaciones: true,

            settings: [],
            msjError: '',
            array_test: {},
            switchInput: false,

            array_cuartos_busqueda: [],

            model_agencia_selected: null,
            search: null,
            money: {
                decimal: '.',
                thousands: ',',
                prefix: '',
                suffix: '',
                precision: 2,
                masked: false
            }
        }
    },
    created() {

    },
    mounted() {
    },
    methods: {
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        switchInputEvent() {
            this.switchInput = true;
            this.calcularTotalSaldo();
        },
        pruebaGetInfoInputMain(index) {
            // var prueba1 = this.json_busqueda_prueba[index].saldo.replace(/[^a-z0-9\s]/gi, '');
            // this.json_busqueda_prueba[index].saldo = prueba1;
            this.switchInput = false;
            this.calcularTotalSaldo();
            console.log(index);
        },
        agregarHabAOrden(modelo) {
            this.id_producto = modelo.identificador;
            this.peticionTest();
            // this.dialog_habitaciones = false;
            // this.dialog = false;
            // this.array_busqueda_agencia = [];
            // this.modelo_habitaciones = [];
            // this.snackbar = false;

        },
        agregarReserva() {

            this.json_busqueda_prueba.push({
                'identificador': this.array_temp_producto.search.identificador,
                'saldo': this.array_temp_producto.search.saldo,
                'importe': this.array_temp_producto.search.importe,
                'tipo_producto': this.array_temp_producto.search.tipo,
                'descripcion': this.array_temp_producto.search.descripcion
            });
            this.limpiarBusquedas();
            this.calcularTotalSaldo();
            // this.calcularTotalBusqueda();
            // console.log(this.json_busqueda_prueba);
            this.msjError = '';
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
            this.mensaje("Se ha creado nueva orden", 'warning');
        },
        limpiarTabla() {
            this.json_busqueda_prueba = [];

            this.array_test = [];
            this.calcularTotalSaldo();

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
            this.timeout = 3000;
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
        formatearIdentificador(tipo, identificador) {
            var id = '';
            switch (tipo) {
                case 'Tour':
                    id = identificador.replace('T', '');
                    break;
                case 'Reservacion':
                    id = identificador.replace('H', '');
                    break;
                case 'Grupo':
                    id = identificador.replace('G', '');
                    break;
                case 'Boda':
                    id = identificador.replace('B', '');
                    break;
                case 'Actividad':
                    id = identificador.replace('A', '');
                    break;

                default:
                    break;
            }
            return id;
        },
        unirBusquedaConPagoGrid() {
            var that = this;
            this.precios.forEach(element => {

                that.json_busqueda_prueba.push({
                    'identificador': this.formatearIdentificador(element.tipo, element.identificador),
                    'saldo': element.saldo,
                    'importe': element.importe,
                    'tipo_producto': element.tipo,
                    'descripcion': element.descripcion
                });
            });
            this.calcularTotalSaldo();
        },
        abrirModal() {

            this.nombre_agencia = this.model_agencia_selected.nombre_agencia;
            this.id_agencia = this.model_agencia_selected.id_agencia;
            this.buscarAgenciaPagos();
            if (this.array_busqueda_agencia != []) {
                this.mostrarBotonBusqueda = false;
                this.dialog = true;
            }


        },
        peticionTest() {

            this.$http
                .get(this.RMTURL + "contabilidad/ordenPago/search?identificador=" + this.id_producto).then(function (response) {
                    this.array_temp_producto = response.body;
                    // console.log(this.array_temp_producto);

                    if (this.array_temp_producto.empty == "No ingreso algun código de busqueda") {
                        this.msjError = "<p>" + this.array_temp_producto.empty + "</p>";
                    } else if (this.array_temp_producto.empty == "Ocurrió un error al momento de la busqueda. Consulte a Soporte.") {
                        this.mensaje(this.array_temp_producto.empty, "red");
                    } else if (this.array_temp_producto.empty == '') {
                        if (this.array_temp_producto.search.error != '') {
                            this.msjError = "<p>" + this.array_temp_producto.search.error + "</p>";
                            this.mensaje(this.array_temp_producto.search.error, "red");

                        } else {
                            this.agregarReserva();

                            this.mensaje("Se ha agregado el producto" + this.id_producto, 'green');
                        }

                    } else {
                        this.mensaje(this.array_temp_producto.search.error, "red");

                    }
                    // this.agregarReserva();
                    // this.msjError = "<p>" + this.array_temp_producto.search.error + "</p>";
                    // this.mensaje("Se ha agregado el producto" + this.id_producto, 'green');
                },
                    function () {
                        console.log("Error");
                        this.msjError = "Hubo un error";
                    }
                );

        },

        crearOrdenPago() {
            console.log(this.model_agencia_selected);
            this.calcularTotalSaldo();
            if (this.json_busqueda_prueba.length > 0 && this.model_agencia_selected != null) {
                this.id_agencia = this.model_agencia_selected.id_agencia;
                this.array_test = {
                    'OrdenPago': {
                        "id_usuario": 456,
                        "id_agencia": this.id_agencia,
                        "importe_total": this.total_saldo,
                        "observaciones": this.observacion
                    },
                    'OrdenPagoDetalles': this.json_busqueda_prueba,
                };
                var data = { 'Orden': this.array_test };
                this.$http.post('https://www.rutamayatravel.com/sur4dev/admin/contabilidad/ordenPago/crearOrdenPago', data, { emulateJSON: true }).then(function (response) {
                    // Success
                    // console.log(response.data);
                    if (response.data.error == false) {

                        this.nuevaOrden();
                        this.dialog_confirmar_guardar = false;
                        this.mensaje("Se ha guardado el pago", "green");
                    } else {
                        this.mensaje("Error al momento de guardar el pago", "red");
                    }

                }, function (response) {
                    // Error
                    console.log(response.data)
                });

            } else if (this.json_busqueda_prueba.length == 0) {
                this.mensaje("No tiene agregado productos", "warning");
            } else {
                this.mensaje("Ingrese una agencia", "warning");
            }







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

        buscarAgenciaPagos() {
            this.loader = true;
            this.$http.get(this.RMTURL + "contabilidad/ordenPago/searchAll?agencia=" + this.id_agencia).then(
                function (response) {
                    this.array_busqueda_agencia = response.body.search;
                    // console.log(this.array_busqueda_agencia);
                    this.isLoading = false;
                    this.loader = false;
                },
                function () {
                    console.log("Error");
                }
            );
        },
        modal_habitaciones(modelo) {
            var id = this.formatearIdentificador(modelo.tipo, modelo.identificador);
            this.$http.get(this.RMTURL + "contabilidad/ordenPago/obtenerCuartos?identificador=" + id).then(
                function (response) {
                    this.array_cuartos_busqueda = response.body.rows;
                    this.loaderHabitaciones = false;
                },
                function () {
                    console.log("Error");
                }
            );
        }





    },
    computed: {
        busquedaReservas: function () {
            var self = this;
            return this.array_busqueda_agencia.filter(data => {
                // if (data.novios != null) {

                return (
                    data.Reservas.identificador
                        .toLowerCase()
                        .includes(self.busquedaReservastxt.toLowerCase()) ||
                    data.Reservas.tipo
                        .toLowerCase()
                        .includes(self.busquedaReservastxt.toLowerCase())
                );
                // }
            });
        }
    },
    watch: {
        search(val) {
            this.isLoading = true

            // Lazily load input items
            fetch("https://www.rutamayatravel.com/sur4/admin/agencias/busquedaAgencias?search=" + val)
                .then(res => res.json())
                .then(res => {
                    this.listaAgencias = res;
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => (this.isLoading = false))
        },
    },

};