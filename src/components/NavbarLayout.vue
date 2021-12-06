<template>
  <div class="dashboard">
    <v-app-bar
      class="teal"
      app
      dark
      flat>
      <div>
        <v-list-item
          light>
          <v-list-item-content class="white">
            <v-list-item-title class="title"> Tumbas Ecommerce </v-list-item-title>
            <v-list-item-subtitle> Buy what are you want </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-tabs v-model="tab"
        width="fit-content">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab 
          v-for="item in items"
          :key="item"
          :to="item.to">{{ item.title }}</v-tab>
      </v-tabs>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-divider></v-divider>
    <div class="fullheight pa-5">
        <router-view></router-view>
    </div>

    <!--
    <v-navigation-drawer v-model="drawer" class="fullheight teal" width="256" app>
      <v-list-item>
        <v-list-item-content class="white">
          <v-list-item-title class="title"> Tumbas Ecommerce </v-list-item-title>
          <v-list-item-subtitle> Buy what are you want </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
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
    <v-app-bar app fixed height="75px" class="teal">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <div class="fullheight pa-5">
        <router-view></router-view>
    </div>
    -->
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: 'mdi-image', to: '/homePage' },
        { title: 'Category', icon: 'mdi-view-dashboard', to: '/kategoriPage' },
        { title: 'Brand', icon: 'mdi-view-dashboard', to: '/brandPage' },
        { title: 'Produk', icon: 'mdi-view-dashboard', to: '/produkPage' },
      ],
      right: null,
    };
  },
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