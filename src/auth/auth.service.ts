import { User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto-js';

@Injectable()
export class AuthService {
    public constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    // JWT验证 - Step 2: 校验用户信息
    public async validateUser(userName: string, pwd: string): Promise<boolean> {
        const user = await this.user.findOne({
            select: ['userName', 'pwd'],
            where: {
                userName,
            },
        });

        return user && bcrypt.compare(pwd, user.pwd);
    }

    // JWT验证 - Step 3: 处理 jwt 签证
    public certificate(user: any): string {

        // 这里对jwt的内容采用了 crypto 中的aes的对称加密方法
        const payload = {
            info: crypto.AES.encrypt(
                JSON.stringify({ userName: user.userName, pwd: user.pwd }),
                'salt',
            ).toString(),
        };

        return this.jwtService.sign(payload);
    }
}