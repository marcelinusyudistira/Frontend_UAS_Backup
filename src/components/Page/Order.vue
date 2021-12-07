<template>
    <div>
        <div class="my-5 mx-auto text-h3">
            Your Order
        </div>
        <v-card 
            v-for="n in 5"
            :key="n"
            class="mx-auto mb-3 hidden-sm-and-down"
            height="150px">
            <div class="d-flex">
                <v-img
                    width="150px"
                    height="150px"
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
                <v-btn depressed x-small fab><v-icon>mdi-minus</v-icon></v-btn>
                <div class="mx-2"> 2 </div>
                <v-btn depressed x-small fab><v-icon>mdi-plus</v-icon></v-btn>
                <v-btn color="teal" text>VIEW PRODUK</v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            v-for="n in 5"
            :key="n"
            class="mx-auto mb-3 hidden-md-and-up"
            height="250px">
            <div class="d-flex">
                <v-img
                    width="100px"
                    height="250px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
                <v-container fluid class="fill-height">
                    <div align="left">
                        <v-card-title class="font-weight-bold">Whitehaven Beach</v-card-title>
                        <v-card-subtitle>Whitsunday Island, Whitsunday Islands</v-card-subtitle>
                        <div class="mx-4 font-weight-bold text-uppercase">rp. 100.000</div>
                    </div>
                </v-container>
            </div>
            <v-card-actions class="float-left float-end" style="margin-top:-120px">
                <v-col>
                    <v-row>
                        <v-col/>
                        <v-col>
                            <v-card-actions>
                                <v-btn depressed x-small fab><v-icon>mdi-minus</v-icon></v-btn>
                                <div class="mx-2"> 2 </div>
                                <v-btn depressed x-small fab><v-icon>mdi-plus</v-icon></v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-btn class="mt-n2" color="teal" text>VIEW PRODUK</v-btn>
                    </v-row>
                </v-col>
            </v-card-actions>
            
        </v-card>
    </div>
</template>