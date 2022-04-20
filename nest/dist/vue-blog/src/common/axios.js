"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.searchList = exports.allList = void 0;
const http_1 = require("./http");
const allList = (data) => {
    return (0, http_1.get)("/api/article/list", data);
};
exports.allList = allList;
const searchList = (data) => {
    return (0, http_1.get)("/api/article/searchList", data);
};
exports.searchList = searchList;
const findById = (id) => {
    return (0, http_1.get)("/api/article/list", id);
};
exports.findById = findById;
//# sourceMappingURL=axios.js.map