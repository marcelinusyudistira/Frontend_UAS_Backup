<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Produk</h3>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>

                <v-spacer></v-spacer>

                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>

            </v-card-title>
            <v-data-table :headers="headers" :items="produks" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id)">delete</v-btn>
                </template>
                <template v-slot:[`item.gambarProduk`]="{ item }">
                    <v-img :src="require('@/assets/produk/'+ item.gambarProduk + item.id +'.png')" class="white--text align-end" height="80px" width="80px"></v-img>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Produk</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.namaProduk" label="Nama Produk" required></v-text-field>
                        <v-text-field v-model="form.category_id" label="Kategori" required></v-text-field>
                        <v-text-field v-model="form.brand_id" label="Brand" required></v-text-field>
                        <v-text-field v-model="form.harga" label="Harga" required></v-text-field>
                        <v-text-field v-model="form.stok" label="Stok" required></v-text-field>
                        <v-text-field v-model="form.deskripsi" label="Deskripsi" required></v-text-field>
                        <v-text-field v-model="form.gambarProduk" label="Gambar Produk" required></v-text-field>
                    </v-container>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
                    </v-card-action>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning</span>
                </v-card-title>
                <v-card-text>Anda Yakin ingin menghapus Produk ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                { text: "Nama Produk", align: "start", sortable: true, value: "namaProduk"},
                { text: "Kategori", value: 'category_id'},
                { text: "Brand", value: 'brand_id'},
                { text: "Harga", value: 'harga'},
                { text: "Stok", value: 'stok'},
                { text: "Deskripsi", value: 'deskripsi'},
                { text: "Gambar Produk", value: 'gambarProduk'},
                { text: "Actions", value: 'actions'},
            ],
            produk: new FormData,
            produks: [],
            form: {
                namaProduk: null,
                category_id: null,
                brand_id: null,
                harga: null,
                stok: null,
                deskripsi: null,
                gambarProduk: null
            },
            deleteId: '',
            editId: ''
        };
    },
    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },
        //Read Data Produk
        readData() {
            var url = this.$api + '/produk';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.produks = response.data.data;
            })
        },
        //Simpan data Produk
        save() {
            this.produk.append('namaProduk', this.form.namaProduk);
            this.produk.append('category_id', this.form.category_id);
            this.produk.append('brand_id', this.form.brand_id);
            this.produk.append('harga', this.form.harga);
            this.produk.append('stok', this.form.stok);
            this.produk.append('deskripsi', this.form.deskripsi);
            this.produk.append('gambarProduk', this.form.gambarProduk);

            var url = this.$api + '/produk/'
            this.load = true;
            this.$http.post(url, this.produk, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); // baca data
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data Category
        update() {
            let newData = {
                namaProduk : this.form.namaProduk,
                category_id : this.form.category_id,
                brand_id : this.form.brand_id,
                harga : this.form.harga,
                stok : this.form.stok,
                deskripsi : this.form.deskripsi,
                gambarProduk : this.form.gambarProduk,
            };
            var url = this.$api + '/produk/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); // baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapus data Produk
        deleteData() {
            //menghapus data
            var url = this.$api + '/produk/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); // baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = "Ubah";
            this.editId = item.id;
            this.form.namaProduk = item.namaProduk;
            this.form.category_id = item.category_id;
            this.form.brand_id = item.brand_id;
            this.form.harga = item.harga;
            this.form.stok = item.stok;
            this.form.deskripsi = item.deskripsi;
            this.form.gambarProduk = item.gambarProduk;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.resetData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                namaKategori: null,
                deskripsi: null,
                gambarKategori: null,
            };
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
};
</script>