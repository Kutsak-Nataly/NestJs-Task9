import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserPublic } from './user';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getAll(): Promise<UserPublic[]> {
        const users = await this.userService.getAll();
        if (!users) {
            throw new HttpException('Users Not found', HttpStatus.NOT_FOUND);
        } else {
            return users.map(User.toResponse);
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<UserPublic> {
        const user = await this.userService.getById(id);
        if (!user) {
            throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
        } else {
            return User.toResponse(user);
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async post(@Body() user: User): Promise<UserPublic> {
        const userCreate = await this.userService.post(user);
        if (!userCreate) {
            throw new HttpException('User not create', HttpStatus.BAD_REQUEST);
        } else {
            return User.toResponse(userCreate);
        }
    }

    @Put(':id')
    async put(@Body() user: User, @Param('id') id: string): Promise<UserPublic> {
        user.id = id;
        const userPut = await this.userService.put(user);
        if (!userPut) {
            throw new HttpException('User not update', HttpStatus.NOT_MODIFIED);
        } else {
            return User.toResponse(userPut);
        }

    }

    @Delete(':id')
    async deleteById(@Param('id')  id: string): Promise<number> {
        const deleteResult = await this.userService.deleteById(id);
        if (deleteResult.affected === 0) {
            throw new HttpException(`Error delete By Id ${id} User`, HttpStatus.BAD_REQUEST);
        } else {
            return deleteResult.affected;
        }
    }
}
