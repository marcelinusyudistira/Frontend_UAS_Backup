<template>
    <div>
        <v-card 
            class="mx-auto hidden-sm-and-down"
            max-width="800px"
            height="300px">
            <div class="d-flex">
                <v-img
                    width="300px"
                    height="300px"
                    :src="require('@/assets/produk/' + item.gambarProduk + '.jpg')"/>
                <v-container fluid class="fill-height">
                    <div align="left">
                        <v-card-title class="font-weight-bold">{{item.namaProduk}}</v-card-title>
                        <v-card-subtitle>Whitsunday Island, Whitsunday Islands</v-card-subtitle>
                        <div class="mx-4 font-weight-bold text-uppercase">Rp. {{item.harga}}</div>
                    </div>
                    <v-card-text align="left" class="text--primary">
                        {{item.deskripsi}}
                    </v-card-text>
                </v-container>
            </div>
            <v-card-actions class="float-left float-end mt-n13">
                <v-btn @click="addOrderList(item)" color="teal" text>ADD TO CART</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> Berhasil menambahkan ke Keranjang </v-snackbar>
    </div>
    
</template>

<script>
export default {
    data: () => ({
        queryindeks: 0,
        item: {},
        produk_id:'',
        order_id:'',
        jumlah:'',
        jumlah_harga:'',
        load: false,
        snackbar:false,
    }),
    methods: {
        readData() {
            var url = this.$api + '/produk/' + this.$route.params.id;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.item = response.data.data;
            })
        },
        addOrderList(item){
            let newData = {
                produk_id : item.id,
                order_id : 1,
                jumlah : 1,
                jumlah_harga : item.harga,
            };

            var url = this.$api + '/orderdetail/'
            this.load = true;
            this.$http.post(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.readData(); // baca data
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readData();
    },
}
</script>
