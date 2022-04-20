"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const router_1 = require("./common/router");
const ant_design_vue_1 = require("ant-design-vue");
require("ant-design-vue/dist/antd.css");
require("./assets/css/public.scss");
(0, vue_1.createApp)(App_vue_1.default).use(router_1.default).use(ant_design_vue_1.default).mount("#app");
//# sourceMappingURL=main.js.map