<template>
	<div class="container">

		<div class="row">

			<!-- Barra de la derecha -->
			<div class="col-md-2">
				<ul class="list-group">
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(); titulo='Todos';">Todos</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(6); titulo='Cancun';">Cancun</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click=" titulo='Costa Mujeres';">Costa Mujeres</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(14); titulo='Cozumel';">Cozumel</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(20); titulo='Huatulco';">Huatulco</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(21); titulo='Isla Mujeres';">Isla Mujeres</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(74); titulo='Los Cabos';"> Los Cabos </a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(27); titulo='Mazatlan';">Mazatlan</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(43); titulo='Riviera Maya';">Riviera Maya</a>
					</li>
					<li class="list-group-item">
						<a href="#" style="font-family:Arial, Helvetica, sans-serif; color: #00b3ff;" @click="loadHoteles(40); titulo='Vallarta';">Vallarta</a>
					</li>

				</ul>
			</div>
			
			<div class="col-md-10">
				<h2 class="text-center">{{ titulo }}</h2>
					<v-row>
						<template   v-for="(item,index) in hoteles" >							
								<app-card 
						:id="index"
						colClasses="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12"
						:key="index">
								<a :href="'/bodas/detalle/' + item.id_paquete" v-if="item.foto_principal != null"><img class="img-fluid" :src="'https://www.rutamayatravel.com/imagenes/'+ item.foto_principal" height="200" alt="foto del hotel"></a>
								<a :href="'/bodas/detalle/' + item.id_paquete" v-else><img class="img-fluid" src="https://gotrips.lk/site/images/uploads/img.jpg" alt="foto del hotel"></a>

								<div class="card-body">
									

									<h5 class="card-title">{{item.nom_hotel}}</h5>
									<p>
										{{item.descripcion_corta}}
									</p>
									<div class="footer-card">
										<div class="row">
											<div class="col">
												<p v-if="item.precio>0" class="text-center ">$ {{formatPrice(item.precio)}} {{item.moneda}}</p>
												<p v-else class="text-center ">Paquete Complementario</p>
											</div>
											<div class="col">
												<a :href="'/bodas/detalle/' + item.id_paquete" class="btn btn-detalle d-block ml-auto" style="color:white;">Ver más</a>

											</div>
										</div>

									</div>
								</div>

							</app-card>
						</template>
					</v-row>
					
			</div>
		</div>
	</div>
</template>



<script>

	export default {
    data(){
		return{
		hoteles: [],
		titulo: 'Todos'
	}
	},
    created: function () {
    },
    mounted: function () {
        this.loadHoteles();
    },
    methods: {
        formatPrice(value) {
            // var redondear = Math.ceil(value);
            // let val = (redondear / 1).toFixed(2).replace(',', '.')
            // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        },
        loadHoteles: function (destino = null) {

            if(destino == null){
                this.$http.get('https://www.rutamayatravel.com/sur4/hoteles/getHoteles').then(function (response) {
                    this.hoteles = response.body;
                    // console.log(this.hoteles);
                    // console.log(destino);
                }, function () {
                    console.log('Error');
                });
            }else{
                this.$http.get('https://www.rutamayatravel.com/sur4/hoteles/getHoteles?destino='+destino).then(function (response) {
                    this.hoteles = response.body;
                    // console.log(this.hoteles);
                    // console.log(destino);
                }, function () {
                    console.log('Error');
                });
            }
        }

    }

}
</script>