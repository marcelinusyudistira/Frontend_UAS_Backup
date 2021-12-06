import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: importComponent('DashboardLayout'),
            children: [
                //Dashboard
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    meta: { title: 'Dashboard' },
                    component: importComponent('Dashboard'),
                },
                //User
                {
                    path: '/user',
                    name: 'User',
                    meta: { title: 'Users' },
                    component: importComponent('DataMaster/Users'),
                },
                //Produk
                {
                    path: '/produk',
                    name: 'Produk',
                    meta: { title: 'Produks' },
                    component: importComponent('DataMaster/Produk'),
                },
                //Category
                {
                    path: '/category',
                    name: 'Category',
                    meta: { title: 'Categories' },
                    component: importComponent('DataMaster/Category'),
                },
                //Brand
                {
                    path: '/brand',
                    name: 'Brand',
                    meta: { title: 'Brands' },
                    component: importComponent('DataMaster/Brand'),
                },
            ],
        },

        // Login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login'},
            component: importComponent('Login'),
        },
        // Register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register'},
            component: importComponent('Register'),
        },

        {
        path: '/homes',
            component: importComponent('NavbarLayout'),
            children: [
                //Dashboard
                {
                    path: '/homePage',
                    name: 'Home',
                    meta: { title: 'Home' },
                    component: importComponent('Page/Home'),
                },
                //Produk
                {
                    path: '/produkPage',
                    name: 'Produk',
                    meta: { title: 'Produk' },
                    component: importComponent('Page/Produk'),
                },
                //Category
                {
                    path: '/kategoriPage',
                    name: 'Kategori',
                    meta: { title: 'Kategori' },
                    component: importComponent('Page/Kategori'),
                },
                //Brand
                {
                    path: '/brandPage',
                    name: 'Brand',
                    meta: { title: 'Brands' },
                    component: importComponent('Page/Brand'),
                },
            ],
        },


        {
            path: '*',
            redirect: '/'
        },
    ],
});

//Set judul
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;