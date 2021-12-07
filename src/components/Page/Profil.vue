<template>
    <div>
        <v-card 
            class="mx-auto hidden-sm-and-down"
            max-width="800px"
            height="200px">
            <div class="d-flex">
                <v-img
                    width="200px"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
                <v-container fluid class="fill-height">
                    <div align="left">
                        <v-card-title class="font-weight-bold">John Smith</v-card-title>
                    </div>
                </v-container>
            </div>
            <v-card-actions class="float-left float-end mt-n13">
                <v-btn color="error" depressed>DELETE ACCOUNT</v-btn>
                    <v-btn color="teal" text>EDIT PROFILE</v-btn>
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
                    <v-card-title class="font-weight-bold">John Smith</v-card-title>
                </div>
                <v-card-actions>
                    <v-btn color="error" depressed>DELETE</v-btn>
                    <v-btn color="teal" text>EDIT</v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
    </div>
    
</template>