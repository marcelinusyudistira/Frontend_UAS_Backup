<template>
  <div>
    <div v-if="jenis === 'category'">
      <v-container v-model="searchctx" class="my-5 mx-auto text-h3">
      {{ searchtitle }}
    </v-container>
    <v-container fluid class="d-flex flex-wrap mx-auto mt-5">
      <v-card
        class="mx-auto my-3"
        width="250px"
        height="300px"
        v-for="x in items.filter((x) => x.category_id === queryindex)"
        :key="x"
        @click="viewProduct(x.id)">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="require('@/assets/produk/' + x.gambarProduk + '.png')"/>
        <v-col>
          <v-row class="mx-2 mt-2 text-body-1">
            {{ x.namaProduk }}
          </v-row>
          <v-row class="mx-2 mt-2 text-body-2">
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
    <div v-if="jenis === 'brand'">
      <v-container v-model="searchctx" class="my-5 mx-auto text-h3">
      {{ searchtitle }}
    </v-container>
    <v-container fluid class="d-flex flex-wrap mx-auto mt-5">
      <v-card
        class="mx-auto my-3"
        width="250px"
        height="300px"
        v-for="x in items.filter((x) => x.brand_id === queryindex)"
        :key="x"
        @click="viewProduct(x.id)">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="require('@/assets/produk/' + x.gambarProduk + '.png')"/>
        <v-col>
          <v-row class="mx-2 mt-2 text-body-1">
            {{ x.namaProduk }}
          </v-row>
          <v-row class="mx-2 mt-2 text-body-2">
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
    
  </div>

</template>

<script>
  export default {
    data: () => ({
      searchctx: "sr",
      searchtitle: "Search Result",
      searchquery: "",
      queryindex: 0,
      jenis:"",
      items: [],
    }),
    methods: {
      viewProduct(index){
        this.$router.push({
          name: 'ProdukP',
          params: {id: index}
        });
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
    beforeMount(){
      var cpath = this.$route.path;
      if(cpath.match("/kategoriPage/")){
        this.searchctx = "cat";
        this.queryindex = this.$route.params.id;

        this.searchtitle = "Category "+this.queryindex;
        
        //Kode display data dari kategori ke-<id> di sini
        this.jenis = "category";
        
      }else if(cpath.match("/brandPage/")){
        this.searchctx = "bra";
        this.queryindex = this.$route.params.id;

        this.searchtitle = "Brand "+this.queryindex;

        //Kode display data dari brand ke-<id> di sini
        this.jenis = "brand";

      }else {
        this.searchquery = this.$route.query.search;
        this.searchtitle = "Result for " + this.searchquery;

        //Kode Display hasil search di sini
      }
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