export default [
    {
        path: '/',
        component: () => import('../views/Dashboard.vue'),
    },
    {
        path: '/calculator',
        component: () => import('../views/Calculator.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];
