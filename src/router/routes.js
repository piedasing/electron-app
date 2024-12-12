export default [
    {
        path: '/',
        component: () => import('../views/Dashboard.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];
