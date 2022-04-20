"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.post = exports.get = void 0;
const axios_1 = require("axios");
const ant_design_vue_1 = require("ant-design-vue");
const http = axios_1.default.create({
    baseURL: "http://localhost:3006/",
});
http.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});
http.interceptors.response.use((res) => {
    const { data } = res;
    if (data.code !== 200) {
        ant_design_vue_1.message.error(data.message);
    }
    return data;
}, (error) => {
    return Promise.reject(error);
});
const get = (url, params) => {
    return http.get(url, { params });
};
exports.get = get;
const post = (url, data) => {
    return http.post(url, data);
};
exports.post = post;
const update = (url, data) => {
    return http.put(url, data);
};
exports.update = update;
const remove = (url) => {
    return http.delete(url);
};
exports.remove = remove;
//# sourceMappingURL=http.js.map