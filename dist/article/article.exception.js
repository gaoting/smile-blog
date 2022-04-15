"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleException = void 0;
const common_1 = require("@nestjs/common");
class ArticleException extends common_1.HttpException {
    constructor() {
        super('Article', common_1.HttpStatus.I_AM_A_TEAPOT);
    }
}
exports.ArticleException = ArticleException;
//# sourceMappingURL=article.exception.js.map