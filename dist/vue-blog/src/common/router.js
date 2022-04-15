"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => Promise.resolve().then(() => require("../views/home/index.vue")),
    },
    {
        path: "/vue",
        name: "Vue",
        component: () => Promise.resolve().then(() => require("../views/public/index.vue")),
    },
];
const routerConfig = {
    history: (0, vue_router_1.createWebHashHistory)(),
    routes,
    scrollBehavior(to, from) {
        if (to.path !== from.path) {
            return { top: 0 };
        }
    },
};
const router = (0, vue_router_1.createRouter)(routerConfig);
exports.default = router;
//# sourceMappingURL=router.js.map