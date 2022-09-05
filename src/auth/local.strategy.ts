/*
 * @Author: gaoting_fanhan 837082729@qq.com
 * @Date: 2022-08-12 13:52:38
 * @LastEditors: gaoting_fanhan 837082729@qq.com
 * @LastEditTime: 2022-08-19 10:54:52
 * @FilePath: /smile-blog-vue3/Users/smile/Coding/smile-blog/src/auth/local.strategy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { compareSync } from 'bcrypt';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { User } from './../user/user.entity';

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // 如果不是username、password， 在constructor中配置
    super({
      usernameField: 'userName',
      passwordField: 'pwd',
    } as IStrategyOptions);
  }

  async validate(userName: string, pwd: string): Promise<any> {
    // 因为密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.pwd')
      .where('user.userName=:userName', { userName })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }

    if (!compareSync(pwd, user.pwd)) {
      throw new BadRequestException('密码错误！');
    }

    return user;
  }
}
