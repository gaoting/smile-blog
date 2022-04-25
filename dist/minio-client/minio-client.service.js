"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioClientService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const config_1 = require("./config");
const crypto = require("crypto");
let MinioClientService = class MinioClientService {
    constructor(minio) {
        this.minio = minio;
        this.baseBucket = config_1.config.MINIO_BUCKET;
        this.logger = new common_1.Logger("MinioStorageService");
    }
    get client() {
        return this.minio.client;
    }
    async upload(file, baseBucket = this.baseBucket) {
        if (!(file.mimetype.includes("jpeg") || file.mimetype.includes("png"))) {
            throw new common_1.HttpException("Error uploading file", common_1.HttpStatus.BAD_REQUEST);
        }
        let temp_filename = Date.now().toString();
        let hashedFileName = crypto
            .createHash("md5")
            .update(temp_filename)
            .digest("hex");
        let ext = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length);
        const metaData = {
            "Content-Type": file.mimetype,
            "X-Amz-Meta-Testing": 1234,
        };
        let filename = hashedFileName + ext;
        const fileName = `${filename}`;
        const fileBuffer = file.buffer;
        this.client.putObject(baseBucket, fileName, fileBuffer, metaData, function (err, res) {
            if (err)
                throw new common_1.HttpException("Error uploading file", common_1.HttpStatus.BAD_REQUEST);
        });
        return {
            url: `${config_1.config.MINIO_ENDPOINT}:${config_1.config.MINIO_PORT}/${config_1.config.MINIO_BUCKET}/${filename}`,
        };
    }
    async delete(objetName, baseBucket = this.baseBucket) {
        this.client.removeObject(baseBucket, objetName, function (err, res) {
            if (err)
                throw new common_1.HttpException("Oops Something wrong happend", common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
MinioClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_minio_client_1.MinioService])
], MinioClientService);
exports.MinioClientService = MinioClientService;
