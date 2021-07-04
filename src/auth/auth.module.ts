import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserService, User],
  exports: [AuthService]
})
export class AuthModule {}
