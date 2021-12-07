<template>
    <v-card 
        class="mx-auto"
        max-width="800px"
        height="250px">
        <div class="d-flex">
            <img
                width="250px"
                height="250px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
            <v-container fluid class="fill-height">
                <div align="left">
                    <v-card-title class="font-weight-bold">Whitehaven Beach</v-card-title>
                    <v-card-subtitle>Whitsunday Island, Whitsunday Islands</v-card-subtitle>
                </div>
                <v-card-text align="left" class="text--primary">
                    Deskripsi Produk
                </v-card-text>
            </v-container>
        </div>
        <v-card-actions class="float-left float-end mt-n13">
            <v-btn color="green" text>ADD TO CART</v-btn>
        </v-card-actions>
    </v-card>
</template>