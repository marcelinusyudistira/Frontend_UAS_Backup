<template>
  <div>
    <v-container v-model="searchctx" class="my-5 mx-auto text-h3">
      {{ searchtitle }}
    </v-container>
    <v-container fluid class="d-flex flex-wrap mx-auto mt-5">
      <v-card
        class="mx-auto my-3"
        width="250px"
        height="300px"
        v-for="x in items"
        :key="x"
        @click="viewProduct(x)">
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
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      searchctx: "sr",
      searchtitle: "Search Result",
      searchquery: "",
      queryindex: 0,
      items: [1,2,3,4,5,6,7,8,9,0],
    }),
    methods: {
      viewProduct(index){
        console.log(index);
      }
    },
    beforeMount(){
      var cpath = this.$route.path;
      if(cpath.match("/kategoriPage/")){
        this.searchctx = "cat";
        this.queryindex = this.$route.params.id;

        this.searchtitle = "Category "+this.queryindex;

        //Kode display data dari kategori ke-<id> di sini
      }else if(cpath.match("/brandPage/")){
        this.searchctx = "bra";
        this.queryindex = this.$route.params.id;

        this.searchtitle = "Brand "+this.queryindex;

        //Kode display data dari brand ke-<id> di sini
      }else {
        this.searchquery = this.$route.query.search;
        this.searchtitle = "Result for " + this.searchquery;

        //Kode Display hasil search di sini
      }
    }
  }
</script>