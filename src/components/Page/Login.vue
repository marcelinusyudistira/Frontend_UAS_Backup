<template>
    <div>
        <v-card 
            class="mx-auto hidden-sm-and-down"
            max-width="800px">
            <v-form>
                <div class="d-flex">
                    <v-img
                        width="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
                    <v-container fluid class="fill-height">
                        <div align="left">
                            <v-card-title class="font-weight-bold">Selamat Datang ke Tumbas E-Commerce!</v-card-title>
                        </div>
                        
                        <v-row>
                            <v-text-field v-model="email" 
                            :rules="[rules.required, rules.email]" 
                            class="mx-8 mt-3" 
                            label="E-Mail" 
                            solo/>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="password" 
                            :rules="[rules.required, rules.password]" 
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            class="mx-8 mt-n2" 
                            label="Password" 
                            counter maxlength="16"
                            solo
                            @click:append="showPass = !showPass"/>
                        </v-row>
                        
                        <v-row><v-sheet width="20px" height="50px"></v-sheet></v-row>
                    </v-container>
                </div>
                <v-card-actions class="float-left float-end mt-n13">
                    <v-btn color="primary" depressed @click="startLogin">LOGIN</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        <v-card 
            class="mx-auto hidden-md-and-up"
            width="300px">
            <v-img
                width="300px"
                height="300px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"/>
            <v-container fluid>
                <v-form>
                    <div align="left">
                        <v-card-title class="font-weight-bold">
                            Selamat Datang <br/>
                            ke Tumbas E-Commerce!
                        </v-card-title>
                        <v-row>
                            <v-text-field v-model="email" 
                            :rules="[rules.required, rules.email]" 
                            class="mx-8 mt-3" 
                            label="E-Mail" 
                            solo/>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="password" 
                            :rules="[rules.required, rules.password]" 
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            class="mx-8 mt-n2" 
                            label="Password" 
                            counter maxlength="16"
                            solo
                            @click:append="showPass = !showPass"/>
                        </v-row>
                    </div>
                    <v-card-actions>
                        <v-btn color="primary" depressed @click="startLogin">LOGIN</v-btn>
                    </v-card-actions>
                </v-form>
            </v-container>
        </v-card>
    </div>
</template>
<script>
    export default {
        data: () => ({
            email: "",
            password: "",
            showPass: false,
            rules: {
                required: v => !!v || 'Input field cannot be empty!',
                email: v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid!',
                password: v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
            },
        }),
        methods: {
            startLogin(){
                this.$refs.form.validate();
                //TODO send login info
                this.$router.replace({name: 'Home'});
            },
        },
    }
</script>