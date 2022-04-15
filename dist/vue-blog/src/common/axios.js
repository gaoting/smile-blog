"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allList = void 0;
const http_1 = require("./http");
const allList = (data) => {
    return (0, http_1.get)("article/list", data);
};
exports.allList = allList;
//# sourceMappingURL=axios.js.map