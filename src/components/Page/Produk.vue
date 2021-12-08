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
                    :src="require('@/assets/produk/' + item.gambarProduk + '.png')"/>
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
                <v-btn color="teal" text>ADD TO CART</v-btn>
            </v-card-actions>
        </v-card>
        <v-card 
            class="mx-auto hidden-md-and-up"
            width="300px">
            <v-img
                width="300px"
                height="300px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
            <v-container fluid>
                <div align="left">
                    <v-card-title class="font-weight-bold">Whitehaven Beach</v-card-title>
                    <v-card-subtitle>Whitsunday Island, Whitsunday Islands</v-card-subtitle>
                    <div class="mx-4 font-weight-bold text-uppercase">rp. 100.000</div>
                </div>
                <v-card-text align="left" class="text--primary">
                    Deskripsi Produk
                </v-card-text>
                <v-card-actions>
                    <v-btn color="teal" text>ADD TO CART</v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
    </div>
    
</template>

<script>
export default {
    data: () => ({
        queryindeks: 0,
        item: {},
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
