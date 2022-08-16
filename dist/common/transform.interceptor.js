"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const common_2 = require("@nestjs/common");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        console.log(context);
        return next.handle().pipe((0, operators_1.map)((result) => result));
    }
};
TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        let msg = status >= 500 ? "Service Error" : "Client Error";
        const message = exception.message ? exception.message : `${msg}`;
        const errorResponse = {
            result: {},
            message: message,
            code: -1,
        };
        response.status(status);
        response.header("Content-Type", "application/json; charset=utf-8");
        response.Header("Access-Control-Allow-Origin", "*");
        response.send(errorResponse);
    }
};
HttpExceptionFilter = __decorate([
    (0, common_2.Catch)(common_2.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
