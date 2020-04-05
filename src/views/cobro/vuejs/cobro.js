import $ from 'jquery';
export default {
    data() {
        return {
            nombre_agencia: '',
            id_producto: '',
            dialog: false,
            total_saldo: 0,
            total_importe: 0,
            total_saldo2: 0,
            total_importe2: 0,
            total: 0,
            json_busqueda_prueba: [],
            json_busqueda_agencia_reservas: [{
                'identificador': '135',
                'saldo': 7500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            },
            {
                'identificador': '136',
                'saldo': 3500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            },
            {
                'identificador': '137',
                'saldo': 1500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            }],
            json_busqueda_agencia_gruposbodas: [{
                'identificador': '138',
                'saldo': 10500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            },
            {
                'identificador': '139',
                'saldo': 11500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            },
            {
                'identificador': '140',
                'saldo': 8500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            }],
            json_busqueda_agencia_bloqueos: [{
                'identificador': '141',
                'saldo': 500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            },
            {
                'identificador': '142',
                'saldo': 1350,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            },
            {
                'identificador': '143',
                'saldo': 1220,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            }],
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
        }
    },
    created() {

    },
    mounted() {
        this.MetodosInit();
        this.calcularTotalBusqueda();
    },
    methods: {
        MetodosInit() {
            var that = this;
            $("#id_producto").keypress(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    that.agregarReserva();
                    that.mensaje("Se agregó con exito", 'green');
                }
            });
            $("#buscar_agencia").keypress(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    that.dialog = true;
                }
            });
            if (this.dialog == true) {
                $(this).keypress(function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code == 27) {
                        that.dialog = true;
                    }
                });
            }

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
                'identificador': '135',
                'saldo': 1500,
                'importe': 2700,
                'tipo': 'Reservación',
                'descripcion': 'Reserva #135 Pax: CORDOVA RUBIO CUTBERTO - Hotel: Grand Sirenis Riviera Maya Resort & Spa - 1 Hab(s).'
            });
            this.calcularTotalSaldo();
            this.limpiarBusquedas();
        },
        eliminarReserva(index) {
            this.json_busqueda_prueba.splice(index, 1);
            this.calcularTotalSaldo();

        },
        calcularTotalSaldo() {
            this.total_importe = 0;
            this.total_saldo = 0;
            this.json_busqueda_prueba.forEach(reserva => {
                this.total_saldo = this.total_saldo + reserva.saldo;
                this.total_importe = this.total_importe + reserva.importe;
            });
            this.total = "$ " + this.formatPrice(this.total_importe - this.total_saldo);
            this.mensaje("Se ha eliminado con exito!", 'red');
        },
        nuevaOrden() {
            this.limpiarTabla();
        },
        limpiarTabla() {
            this.json_busqueda_prueba = [];
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
            this.timeout = 1000;
            this.x = 'right';
            this.y = 'bottom';
        },
        calcularTotalBusqueda() {
            this.total_importe2 = 0;
            this.total_saldo2 = 0;

            this.precios.forEach(reserva => {
                this.total_saldo2 = this.total_saldo2 + reserva.saldo;
                this.total_importe2 = this.total_importe2 + reserva.importe;
            });


        },
        unirBusquedaConPagoGrid() {
            var that = this;

            this.precios.forEach(element => {
                that.json_busqueda_prueba.push(element);
            });
            this.calcularTotalSaldo();
        }

    },
};