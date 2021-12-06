<template>
    <div>
        <v-card>
            <v-sheet
                height="100%"
                tile>
                <v-card-title class="text-h3">Select Category</v-card-title>
            </v-sheet>
        </v-card>
        <v-container fluid class="mx-auto mt-5">
            <v-row>
                <v-col
                    v-for="cat in categories"
                    :key="cat">
                    <v-card
                        width="250px"
                        height="270px">
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
                        <v-col>
                            <v-row class="mx-2 mt-2 text-body-1">
                                Kategori Produk
                            </v-row>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
        categories: [
            { title: 'Barang Baru!', col:"red" },
            { title: 'Gebyar Diskon', col:"green" },
            { title: 'Gebyar Diskon', col:"green" },
            { title: 'Gebyar Diskon', col:"green" },
            { title: 'Gebyar Diskon', col:"green" },
            { title: 'Gebyar Diskon', col:"green" },
        ],
        }),
    }
</script>