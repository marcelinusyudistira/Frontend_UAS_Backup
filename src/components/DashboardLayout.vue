<template>
  <div class="dashboard">
    <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app color="blue darken-1">
        <v-list-item>
            <v-list-item-content class="white">
                <v-list-item-title class="title" > Tumbas Ecommerce </v-list-item-title>
                <v-list-item-subtitle> Buy whatever you want </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              align="left"
              tag="router-link"
              :to="item.to">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon> 
              <v-list-item-content >
                <v-list-item-title >{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="75px" color="blue darken-1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router><v-icon>mdi-power</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <div class="fullheight pa-5">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: 'mdi-view-dashboard',to: 'dashboard' },
        { title: 'Manage User', icon: 'mdi-view-dashboard', to: 'user' },
        { title: 'Manage Category', icon: 'mdi-view-dashboard',  to: 'category' },
        { title: 'Manage Brand', icon: 'mdi-view-dashboard',  to: 'brand' },
        { title: 'Manage Produk', icon: 'mdi-view-dashboard',  to: 'produk' },
      ],
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