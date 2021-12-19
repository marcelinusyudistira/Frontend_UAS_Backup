<template>
    <div>
        <div class="my-5 mx-auto text-h3">
            Your Order
        </div>
        <v-card 
            v-for="order in orderList"
            :key="order"
            class="mx-auto mb-3 hidden-sm-and-down"
            height="150px">
            <div class="d-flex"
                v-for="x in produkList.filter((x) => x.id === order.produk_id)"
                :key="x">
                <v-img
                    width="150px"
                    height="150px"
                    :src="require('@/assets/produk/' + x.gambarProduk + '.jpg')"/>
                <v-container fluid class="fill-height">
                    <div align="left"
                        class="font-weight-bold">
                        <v-card-title>{{x.namaProduk}}</v-card-title>
                        <v-card-subtitle>{{ x.deskripsi }}</v-card-subtitle>
                        <div class="mx-4 font-weight-bold text-uppercase">Rp. {{ x.harga }}</div>
                    </div>
                </v-container>
            </div>
            <v-card-actions class="float-left float-end mt-n13">
                <v-btn color="teal" @click="deleteOrder(order.id)" text>HAPUS</v-btn>
                <v-btn color="teal" @click="goHome" text>VIEW PRODUK</v-btn>
            </v-card-actions>
        </v-card>
        
        <v-dialog v-model="purchasedialog.visible"
            class="mx-auto" 
            max-width="500px" 
            transition="dialog-top-transition"
            >
            <template v-slot:activator="{ on, attrs }" >
                <v-btn color="success" x-large dark v-bind="attrs" v-on="on">PURCHASE</v-btn>
            </template>
            <v-card v-model="purchasedialog">
                <v-card-title>Confirm Purchase</v-card-title>
                <v-card-text align="left">
                    Total Amount : Rp {{ total }}
                </v-card-text>
                <v-container fluid>
                    <v-row align="center">
                        <v-col class="d-flex mx-4" cols="12" sm="6">
                            <v-select
                            :items="items"
                            label="Pembayaran"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn depressed class="mx-auto" color="teal" text @click="purchasedialog.visible = false">BATAL</v-btn>
                    <v-btn depressed class="mx-auto" color="primary" @click="pembayaran">BELI</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </div>
</template>

<script>
    export default {
        data: () => ({
            orderList:[],
            produkList:[],
            items: ['Visa', 'PayPal', 'PayWave', 'Master Card'],
            judul:'',
            load: false,
            cekAuth:'false',
            total:0,
            snackbar:false,
            purchasedialog: {
                visible: false,
                totalprice: 0,
            },
            myDate : new Date().toISOString().slice(0,10)
        }),
        methods: {
            viewCategory(index){
                console.log(index);
            },
            readDataOrder() {
                var url = this.$api + '/orderdetail';
                    this.$http.get(url, {
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.orderList = response.data.data;
                    })
            },
            readDataProduk() {
                var url = this.$api + '/produk';
                    this.$http.get(url, {
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.produkList = response.data.data;
                    })
            },
            readTotal(){
                var url = this.$api + '/count';
                    this.$http.get(url, {
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.total = response.data;
                    })
            },
            goHome(){
                this.$router.push({
                name: 'Home',
                });
            },
            deleteOrder(index){
                var url = this.$api + '/orderdetail/' + index;
                this.load = true;
                this.$http.delete(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.readData(); // baca data
                    this.resetForm();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            pembayaran(){
                let newData = {
                    user_id : localStorage.getItem("id"),
                    tanggal : this.myDate,
                    status : "Sudah Bayar",
                    kode : 1,
                    jumlah_harga : this.total,
                };
                
                var url = this.$api + '/order'
                this.load = true;
                this.snackbar = true;
                this.$http.post(url, newData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.purchasedialog.visible=false;
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                    this.purchasedialog.visible=false;
                });
            }

        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readDataOrder();
            this.readDataProduk();
            this.readTotal();
        },
    }
</script>