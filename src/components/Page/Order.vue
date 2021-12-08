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
                    :src="require('@/assets/produk/' + x.gambarProduk + '.png')"/>
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
                <v-btn color="teal" text>HAPUS</v-btn>
                <v-btn color="teal" text>VIEW PRODUK</v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            v-for="n in 5"
            :key="n"
            class="mx-auto mb-3 hidden-md-and-up"
            height="200px">
            <div class="d-flex">
                <v-img
                    width="100px"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
                <v-container fluid class="fill-height">
                    <div align="left">
                        <v-card-title class="font-weight-bold">Whitehaven Beach</v-card-title>
                        <v-card-subtitle>Whitsunday Island, Whitsunday Islands</v-card-subtitle>
                        <div class="mx-4 font-weight-bold text-uppercase">rp. 100.000</div>
                    </div>
                </v-container>
            </div>
            <v-card-actions class="float-left float-end mt-n13">
                <v-btn class="mt-n2" color="teal" text>HAPUS</v-btn>
                <v-btn class="mt-n2" color="teal" text>VIEW PRODUK</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="purchasedialog.visible"
            class="mx-auto" 
            max-width="500px" 
            transition="dialog-top-transition"
            persistent>
            <template v-slot:activator="{ on, attrs }" >
                <v-btn color="success" x-large dark v-bind="attrs" v-on="on">PURCHASE</v-btn>
            </template>
            <v-card v-model="purchasedialog">
                <v-card-title>Confirm Purchase</v-card-title>
                <v-card-text align="left">
                    Total Amount : Rp {{ purchasedialog.totalprice }}
                </v-card-text>
                <v-card-actions>
                    <v-btn depressed color="teal" text @click="purchasedialog.visible = false">BATAL</v-btn>
                    <v-btn depressed color="primary">BELI</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data: () => ({
            orderList:[],
            produkList:[],
            judul:'',
            purchasedialog: {
                visible: false,
                totalprice: 100000,
            },
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


        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readDataOrder();
            this.readDataProduk();
        },
    }
</script>