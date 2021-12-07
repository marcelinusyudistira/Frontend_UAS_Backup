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
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
                <v-col>
                    <v-row class="mx-2 mt-2 text-body-1">
                        Brand X
                    </v-row>
                </v-col>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
        brands: [
            { title: 'Barang Baru!', col:"red" },
            { title: 'Gebyar Diskon', col:"green" },
            { title: 'Gebyar Diskon', col:"green" },
            { title: 'Gebyar Diskon', col:"green" },
        ],
        }),
        methods: {
            viewBrand(index){
                console.log(index);
            }
        }
    }
</script>