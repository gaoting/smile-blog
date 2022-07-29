import { Repository } from "typeorm";
import { Login } from "./login.entity";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateDto } from "./login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class LoginService {
  user: Login
  constructor(
    @InjectRepository(Login)
    private readonly loginService: Repository<Login>
  ) {}

  // 注册
  async create(obj: CreateDto): Promise<any> {
    let userInfo = new Login();
    try {
      const { userName } = obj;
      const existUser = await this.loginService.findOne({
        where: { userName },
      });

      if (existUser) {
        throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST);
      }

      userInfo.userName = obj.userName;
      userInfo.pwd = obj.pwd;
      userInfo.IP = obj.IP ? obj.IP : "";
      userInfo.avatar = obj.avatar ? obj.avatar : "";

      const data = await this.loginService.save(userInfo);
      return { data: data, message: "注册成功" };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: error };
    }
  }

  async createToken(userName: string,pwd: string): Promise<any> {
    const user: CreateDto = {userName:userName,pwd:pwd}
    return jwt.sign(user, 'secretKey', {expiresIn: 3600})
  }

  async validateUser(userName:string):Promise<any> {
    return this.loginService.findOne({userName: userName})
  }

  getUser(): Login {
    return this.user
  }

  // 登录
  async login( userName: string, pwd: string ): Promise<any> {
    console.log(userName, pwd);
    this.user = await this.loginService.findOne({userName: userName})
    console.log(this.user, "this.userrrrrrr");
    if(this.user && this.user.pwd == pwd) {
      return this.createToken(this.user.userName, this.user.pwd)
    } else {
      return 'login failed !'
    }
  }
}
