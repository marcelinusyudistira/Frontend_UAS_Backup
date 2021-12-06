<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-carousel
        :cycle="cycle"
        class="mx-auto"
        height="250px"
        hide-delimiter-background
        >
        <v-carousel-item
          v-for="cset in carousel"
          :key="cset">
          <v-sheet
            :color="cset.col"
            height="100%"
            tile>
            <v-row
              class="fill-height"
              align="center"
              justify="center">
              <div class="text-h2">
                {{ cset.title }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-spacer/>
    </v-card>
    <v-container fluid class="mx-auto mt-5" align="center" justify="center">
      <v-row>

        <!-- Item Container -->
        <v-col
          v-for="x in items"
          :key="x"> 
          <v-card
            width="250px"
            height="300px">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
            <v-col>
              <v-row class="mx-2 mt-2 text-body-1">
                Nama Produk
              </v-row>
              <v-row class="mx-2 mt-2 text-body-2">
                Deskripsi Singkat Produk
              </v-row>
              <v-row class="mx-auto mt-2 float-right">
                <div class="mx-2 overline float-right">
                  rp. 100.000
                </div>
              </v-row>
            </v-col>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
    <!--
    <v-system-bar
      color="indigo darken-2"
      dark
    >
      <v-spacer></v-spacer>

      <v-icon>mdi-window-minimize</v-icon>

      <v-icon>mdi-window-maximize</v-icon>

      <v-icon>mdi-close</v-icon>
    </v-system-bar>

    <v-toolbar
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Discover</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [1,2,3,4,5,6,7,8,9,0 ],
      carousel: [
        { title: 'Barang Baru!', col:"red" },
        { title: 'Gebyar Diskon', col:"green" },
      ],
    }),
  }
</script>