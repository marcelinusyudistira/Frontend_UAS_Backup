<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-carousel
        class="mx-auto"
        height="250px"
        cycle
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
              <div class="text-h2 mx-5">
                {{ cset.title }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-spacer/>
    </v-card>
    <v-container fluid class="d-flex flex-wrap mx-auto mt-5">
      <v-card
        class="mx-auto my-3"
        width="250px"
        height="300px"
        v-for="x in items"
        :key="x"
        @click="viewProduct(x.id)">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="require('@/assets/produk/' + x.gambarProduk + '.png')"/>
        <v-col>
          <v-row class="mx-2 mt-2 text-body-1 ">
            {{ x.namaProduk }}
          </v-row>
          <v-row class="mx-2 mt-2 text-body-2" >
            {{ x.deskripsi.substring(0,23) + "..." }}
          </v-row>
          <v-row class="mx-auto mt-2 float-right">
            <div class="mx-2 overline float-right">
              Rp. {{ x.harga }}
            </div>
          </v-row>
        </v-col>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [],
      carousel: [
        { title: 'Barang Baru!', col:"red" },
        { title: 'Gebyar Diskon', col:"green" },
      ],
    }),
    methods: {
      viewProduct(index){
        console.log(index);
      },
      readData() {
            var url = this.$api + '/produk';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.items = response.data.data;
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