<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-toolbar class="blue darken-3">
                         <v-toolbar-title class="white--text">
                            <h1>Registrasi User</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Nama" v-model="name" :rules="nameRules" required></v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="pasword" min="8" :rules="passwordRules" counter required></v-text-field>
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" @click="submit" :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }">Register</v-btn>
                                        <v-btn @click="clear" class="blue darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                    <p>Sudah memiliki akun? Silahkan<v-btn v-on:click="logPage" color="primary" text x-small>Login</v-btn></p>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    .grey--text{
        font-family: "Roboto";
    }

    .posisinya{
        position: absolute;
        top: 5px;
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        name: "Login",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                user: new FormData,
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong :(',
                ],
                name: '',
                nameRules: [
                    (v) => !!v || 'Nama tidak boleh kosong :(',
                ],
            };
        },
        methods: {
            submit() {
                if(this.$refs.form.validate()) {
                    this.user.append('name', this.name);
                    this.user.append('email', this.email);
                    this.user.append('password', this.password);

                    var url = this.$api + '/register'
                    this.load = true;
                    this.$http.post(url, this.user, {
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                        }
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = true;
                        this.clear();
                        this.$router.push({
                            path: '/login',
                        });
                    }).catch(error => {
                        console.log(error.response)
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    })
                }
            },
            clear() {
               this.$refs.form.reset() //clear form login
           },
           logPage() {
               this.load=true;
               this.$router.push({
                    name: 'Login',
                });
           }
        },
    };
</script>