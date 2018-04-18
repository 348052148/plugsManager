const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/ts',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/translate.vue'], resolve)
    },
    {
        path: '/msg',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/message.vue'], resolve)
    },
    {
        path: '/task',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/tasklist.vue'], resolve)
    },
    {
        path: '/person',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/person.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        name: 'brow',
        path: '/brow/:components',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/brow.vue'], resolve)
    },
    {
        name: 'appbox',
        path: '/appbox',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/appbox.vue'], resolve)
    }

];
export default routers;