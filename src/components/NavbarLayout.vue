<template>
  <div class="dashboard">
    <v-app-bar
      class="teal"
      app
      dark
      style="overflow: hidden">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div>
        <v-list-item
          light>
          <v-list-item-content class="white">
            <v-list-item-title class="title"> Tumbas Ecommerce </v-list-item-title>
            <v-list-item-subtitle> Buy whatever you want </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-tabs v-model="tab"
        width="fit-content"
        class="hidden-sm-and-down">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab 
          v-for="item in items"
          :key="item"
          :to="item.to">{{ item.title }}</v-tab>
      </v-tabs>

      <v-menu
        :close-on-content-click="false"
        offset-y="true"
        bottom
        right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <v-card width="500px">
          <v-container>
            <v-text-field v-model="searchquery"
              solo
              label="Search"
              clearable>
              <v-btn icon slot="append" @click="searchProduct"><v-icon>mdi-magnify</v-icon></v-btn>
            </v-text-field> 
          </v-container>
        </v-card>
      </v-menu>

      <v-menu
        offset-y="true"
        bottom
        right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card v-model="userinfo">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="userinfo.icon"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ userinfo.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="opt in signedoption"
              :key="opt"
              :to="opt.to"
              >
              {{ opt.title }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-divider></v-divider>

    <div class="fullheight pa-5">
        <router-view></router-view>
    </div>

    <v-navigation-drawer v-model="drawer" 
      class="fullheight teal" 
      width="256" 
      app
      temporary
      dark>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      searchquery: "",
      drawer: false,
      items: [
        { title: "Home", icon: 'mdi-image', to: '/homePage' },
        { title: 'Category', icon: 'mdi-view-dashboard', to: '/kategoriPage' },
        { title: 'Brand', icon: 'mdi-view-dashboard', to: '/brandPage' },
        { title: 'Your Order', icon: 'mdi-view-dashboard', to: '/orderPage' },
      ],
      userinfo:{
        name: "John Smith",
        icon: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      },
      signedoption: [
        { title: 'Settings', to:'/profilePage' },
        { title: 'Log Out', to:'/' },
      ],
      right: null,
    };
  },
  methods:{
    searchProduct(){
      this.$router.replace({name: 'Search', query: {search : this.searchquery}});
      if(this.$route.name==="Search"){
        window.location.reload();
      }
    }
  }
};
</script>

<style scoped>
.fullheight {
  min-height: 100vh !important;
}

.router{
  text-decoration: none;
  color: black;
}
</style>