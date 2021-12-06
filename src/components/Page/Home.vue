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
    <v-container fluid class="mx-auto mt-5">
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