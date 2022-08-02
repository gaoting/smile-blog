
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { jwtConstants } from './constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30m' }, // token 过期时效
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],  // 因为auth模块需要导入到User模块，所以需要配置导出
})
export class AuthModule {}