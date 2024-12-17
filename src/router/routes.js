export default [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
    },
    {
        path: '/calculator',
        name: 'calculator',
        component: () => import('../views/Calculator.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];
