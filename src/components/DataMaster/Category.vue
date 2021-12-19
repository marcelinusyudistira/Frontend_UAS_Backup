<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Category</h3>

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
            <v-data-table :headers="headers" :items="categories" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id)">delete</v-btn>
                </template>
                <template v-slot:[`item.gambarKategori`]="{ item }">
                    <v-img :src="require('@/assets/category/'+ item.gambarKategori +'.jpg')" class="white--text align-end" height="80px" width="80px"></v-img>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <v-span class="headline">{{ formTitle }} Category</v-span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.namaKategori" label="Nama Kategori" required></v-text-field>
                        <v-text-field v-model="form.deskripsi" label="Deskripsi" required></v-text-field>
                        <v-text-field v-model="form.gambarKategori" label="Gambar Kategori" required></v-text-field>
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
                <v-card-text>Anda Yakin ingin menghapus Kategori ini?</v-card-text>
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
                { text: "Nama Kategori", align: "start", sortable: true, value: "namaKategori"},
                { text: "Deskripsi", value: 'deskripsi'},
                { text: "Gambar Kategori", value: 'gambarKategori'},
                { text: "Actions", value: 'actions'},
            ],
            category: new FormData,
            categories: [],
            form: {
                namaKategori: null,
                deskripsi: null,
                gambarKategori: null,
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
        //Read Data Category
        readData() {
            var url = this.$api + '/category';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.categories = response.data.data;
            })
        },
        //Simpan data Category
        save() {
            this.category.append('namaKategori', this.form.namaKategori);
            this.category.append('deskripsi', this.form.deskripsi);
            this.category.append('gambarKategori', this.form.gambarKategori);

            var url = this.$api + '/category'
            this.load = true;
            this.$http.post(url, this.category, {
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
                namaKategori : this.form.namaKategori,
                deskripsi : this.form.deskripsi,
                gambarKategori : this.form.gambarKategori,
            };
            var url = this.$api + '/category/' + this.editId;
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
            var url = this.$api + '/category/' + this.deleteId;
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
            this.form.namaKategori = item.namaKategori;
            this.form.deskripsi = item.deskripsi;
            this.form.gambarKategori = item.gambarKategori;
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