import { User } from "../user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto-js";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  public async getUser(userName: string): Promise<any> {
    let data = await this.user.findOne({ where: { userName } });
    return data;
  }

  // JWT验证 - Step 2: 校验用户信息
  public async validateUser(userName: string, pwd: string): Promise<boolean> {
    const user = await this.user.findOne({
      select: ["userName", "pwd"],
      where: {
        userName,
      },
    });

    return user && (await bcrypt.compare(pwd, user.pwd));
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  public certificate(user: any): string {
    // 这里对jwt的内容采用了 crypto 中的aes的对称加密方法

    const payload = {
      info: crypto.AES.encrypt(
        JSON.stringify({ name: user.name, password: user.password }),
        "salt"
      ).toString(),
    };

    return this.jwtService.sign(payload);
  }
}
