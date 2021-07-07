import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { User, UserPublic } from '../user/user';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(private readonly userService: UserService,
                private readonly authService: AuthService
                ) {
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async post(@Body() user: User): Promise<{ token: string }> {
        const { login, password } = user;
        if (login && password) {
            const result = await this.authService.validateUser(login, password);
            if(!result){
                throw new HttpException(`User not found with password: ${password}; login: ${login}`, HttpStatus.NOT_FOUND);
            } else {
                return this.authService.login(login, password);
            }
        } else {
            throw new HttpException('Bad request: login or password', HttpStatus.BAD_REQUEST);
        }

    }


    @Post('/add-admin')
    @HttpCode(HttpStatus.CREATED)
    async addAdmin(@Body() user: User): Promise<UserPublic | undefined> {
        const { login, password } = user;
        if (login && password) {
            const adminCreate = await this.userService.addAdmin(login, password);
            if (!adminCreate) {
                throw new HttpException('Admin not create', HttpStatus.BAD_REQUEST);
            } else {
                return User.toResponse(adminCreate);
            }
        }

    }

}
