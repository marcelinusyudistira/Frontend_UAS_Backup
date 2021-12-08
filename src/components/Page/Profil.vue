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
                    src="http://cdn.onlinewebfonts.com/svg/img_162044.png"/>
                <v-container fluid class="fill-height">
                    <div align="left">
                        <v-card-title class="font-weight-bold">{{ user.name }}</v-card-title>
                        <v-card-subtitle>{{ user.email }}</v-card-subtitle>
                    </div>
                </v-container>
            </div>
            <v-card-actions class="float-left float-end mt-n13">
                <v-btn @click="editHandler(user)" color="teal" text>EDIT PROFILE</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-card>
            <v-card-title>Edit Profil</v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field v-model="form.name" label="Nama" required></v-text-field>
                    <v-text-field v-model="form.email" label="Email" required></v-text-field>
                    <v-text-field v-model="form.password" label="Password" required></v-text-field> 
                </v-container>
            </v-card-text>
            <v-card-action>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="update">Save</v-btn>
            </v-card-action>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user:{},
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            dialog:false,
            users:'',
            form: {
                name: null,
                email: null,
                password: null,
            },
            pengguna: new FormData,
        };
    },
    methods: {
        readData() {
            var url = this.$api + '/user/' + localStorage.getItem('id');
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.user = response.data.data;
                })
            },
        save() {
            this.users.append('name', this.form.name);
            this.users.append('email', this.form.email);
            this.users.append('password', this.form.password);

            var url = this.$api + '/user/'
            this.load = true;
            this.$http.post(url, this.users, {
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
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            // this.resetData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                name: null,
                email: null,
                password: null
            };
        },
        //Ubah data User
        update() {
            let newData = {
                name : this.form.name,
                email : this.form.email,
                password : this.form.password,
            };
            var url = this.$api + '/user/' + this.editId;
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
        editHandler(item) {
            this.inputType = "Ubah";
            this.editId = item.id;
            this.form.name = item.name;
            this.form.email = item.email;
            this.dialog = true;
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
