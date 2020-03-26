export default {
    data() {
        return {
            array_agencia: [],
            loader: false,
            array_paquetes_agencia: [],
            array_proximos_pagos: [],
            headers_paquetes: [
                {
                    text: "Id",
                    align: "start",
                    value: "id_bloqueo",
                    sortable: true
                },
                { text: "Tipo", value: "idTarifa.precio", sortable: true },
                { text: "Hotel", value: "id_hotel", sortable: true },
                { text: "Cant.Habs.", value: "numero_habitaciones", sortable: true },
                { text: "Novios", value: "novios", sortable: true },                
                { text: "Estatus", value: "estatus", sortable: true }
            ],
            id: this.$route.params.id,
        };
    },
    created() {

    },
    mounted() {
        this.loadAgencias();
    },
    methods: {
        formatPrice(value) {
            var redondear = Math.ceil(value);
            let val = (redondear / 1).toFixed(2).replace(',', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        redondearArriba(value) {
            var redondear = Math.ceil(value);

            return redondear;
        },
        loadAgencias() {
            this.loader = true;
            this.$http
                .get("https://www.rutamayatravel.com/sur4/admin/apivue/agencias/" + this.id)
                .then(
                    function (response) {
                        this.array_agencia = response.data;
                        this.loadPaquetesAgencia();
                        this.loadProximosPagos();
                        this.loader = false;
                    },
                    function () {
                        console.log("Error");
                    }
                );
        },
        
        loadProximosPagos(){
            this.$http
            .get("https://www.rutamayatravel.com/sur4/admin/apivue/ProximosPagos/" + this.id)
            .then(
                function (response) {
                    this.array_proximos_pagos = response.data;
                    console.log(this.array_proximos_pagos);
                },
                function () {
                    console.log("Error");
                }
            );
        },
        loadPaquetesAgencia() {
            this.$http
                .get("https://www.rutamayatravel.com/sur4/admin/apivue/listPaquetesAgencia/" + this.id)
                .then(
                    function (response) {
                        this.array_paquetes_agencia = response.data;
                        // console.log(this.array_paquetes_agencia);
                    },
                    function () {
                        console.log("Error");
                    }
                );
        }
    },
};