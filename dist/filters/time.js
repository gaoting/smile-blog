"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNowTime = void 0;
const getNowTime = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var time = "当前时间是：" +
        year +
        "-" +
        addZero(month) +
        "-" +
        addZero(day) +
        " " +
        addZero(hour) +
        ":" +
        addZero(minute) +
        ":" +
        addZero(second);
    return time;
};
exports.getNowTime = getNowTime;
function addZero(s) {
    return s < 10 ? "0" + s : s;
}
