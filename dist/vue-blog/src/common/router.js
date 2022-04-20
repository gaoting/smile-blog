"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => Promise.resolve().then(() => require("../views/public/index.vue")),
    },
    {
        path: "/frondPage",
        name: "FrondPage",
        component: () => Promise.resolve().then(() => require("../views/public/index.vue")),
    },
    {
        path: "/backstage",
        name: "Backstage",
        component: () => Promise.resolve().then(() => require("../views/public/backstage.vue")),
    },
    {
        path: "/content",
        name: "Content",
        component: () => Promise.resolve().then(() => require("../views/public/content.vue")),
    },
    {
        path: "/test",
        name: "Test",
        component: () => Promise.resolve().then(() => require("../views/test/index.vue")),
    },
];
const routerConfig = {
    history: (0, vue_router_1.createWebHistory)(),
    routes,
};
const router = (0, vue_router_1.createRouter)(routerConfig);
exports.default = router;
//# sourceMappingURL=router.js.map