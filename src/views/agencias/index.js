export default {
    data() {
        return {
            headers: [
                {
                    text: "Dessert (100g serving)",
                    align: "start",
                    sortable: false,
                    value: "name"
                },
                { text: "Calories", value: "calories" }
            ],
            array_agencias: [],
            busqueda: ""
        };
    },
    mounted() {
        this.loadAgencias();
    },
    methods: {
        loadAgencias() {
            this.loader = true;
            this.$http
                .get("https://www.rutamayatravel.com/sur4/admin/apivue/agencias")
                .then(
                    function (response) {
                        this.array_agencias = response.data;
                        this.loader = false;
                        console.log(this.array_agencias);
                    },
                    function () {
                        console.log("Error");
                    }
                );
        }
    },
    computed: {
        busquedaAgencia: function () {
            var self = this;

            //   if (this.orderArray == "Ascendiente" || this.orderArray == "") {
            //     self.projectData.sort(function(a, b) {
            //       a = new Date(a.fecha_inicio);
            //       b = new Date(b.fecha_inicio);
            //       return a > b ? 1 : a < b ? -1 : 0;
            //     });
            //   } else {
            //     self.projectData.sort(function(a, b) {
            //       a = new Date(a.fecha_inicio);
            //       b = new Date(b.fecha_inicio);
            //       return a > b ? -1 : a < b ? 1 : 0;
            //     });
            //   }
            return this.array_agencias.filter(data => {
                // if (data.novios != null) {

                return (
                    data.nombre_agencia
                        .toLowerCase()
                        .includes(self.busqueda.toLowerCase()) ||
                    data.municipio_agencia
                        .toLowerCase()
                        .includes(self.busqueda.toLowerCase()) ||
                    data.tel_agencia
                        .toLowerCase()
                        .includes(self.busqueda.toLowerCase()) ||
                    data.email_agencia
                        .toLowerCase()
                        .includes(self.busqueda.toLowerCase()) ||
                    data.contacto.toLowerCase().includes(self.busqueda.toLowerCase()) ||
                    data.id_agencia.toLowerCase().includes(self.busqueda.toLowerCase())
                );
                // }
            });
        }
    }
};