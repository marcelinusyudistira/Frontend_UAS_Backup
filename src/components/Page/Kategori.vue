<template>
    <div>
        <div class="my-5 mx-auto text-h3">
            Select Category
        </div>
        <v-container fluid class="d-flex flex-wrap mx-auto mt-5">
            <v-card
                class="mx-auto my-3"
                width="250px"
                height="270px"
                v-for="cat in kategoris"
                :key="cat"
                @click="viewCategory(cat.id)">
                <v-img
                class="white--text align-end"
                height="200px"
                :src="require('@/assets/category/' + cat.gambarKategori + '.png')"/>
                <v-col>
                    <v-row class="mx-2 mt-2 text-body-1">
                        {{ cat.namaKategori }}
                    </v-row>
                </v-col>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
        kategoris: [],
        }),
        methods: {
            viewCategory(index){
                this.$router.push({
                    name: 'KategoriP',
                    params: {id: index}
                });
            },
            readData() {
            var url = this.$api + '/category';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.kategoris = response.data.data;
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