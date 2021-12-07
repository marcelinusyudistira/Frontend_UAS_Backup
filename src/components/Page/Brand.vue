<template>
    <div>
        <div class="my-5 mx-auto text-h3">
            Select Brand
        </div>
        <v-container fluid class="d-flex flex-wrap mx-auto mt-5">
            <v-card
                class="mx-auto my-3"
                width="250px"
                height="270px"
                v-for="brand in brands"
                :key="brand"
                @click="viewBrand(brand)">
                <v-img
                class="white--text align-end"
                height="200px"
                :src="require('@/assets/brand/' + brand.gambarBrand + '.png')"/>
                <v-col>
                    <v-row class="mx-2 mt-2 text-body-1">
                        {{brand.namaBrand}}
                    </v-row>
                </v-col>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
        brands: [],
        }),
        methods: {
            viewBrand(index){
                console.log(index);
            },
            readData() {
            var url = this.$api + '/brand';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.brands = response.data.data;
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