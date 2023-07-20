import {createRouter, createWebHistory} from "vue-router";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component:() => import ('./views/main/Index.vue'),
            name: 'main'
        },
        {
            path: '/products', component:() => import ('./views/product/Index.vue'),
            name: 'product.index'
        },
        {
            path: '/products/:id', component:() => import ('./views/product/Show.vue'),
            name: 'product.show'
        },
        {
            path: '/cart', component:() => import ('./views/cart/Index.vue'),
            name: 'cart.index'
        },
    ],
})

export default router


