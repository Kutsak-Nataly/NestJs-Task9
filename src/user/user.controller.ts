import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserPublic } from './user';
import { DeleteResult } from 'typeorm';


@Controller('users')
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
    @HttpCode(201)
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
    async deleteById(@Param('id')  id: string): Promise<DeleteResult> {
        const deleteResult = await this.userService.deleteById(id);
        if(!deleteResult){
            throw new HttpException('User not update', HttpStatus.BAD_REQUEST);
        } else {
            return deleteResult;
        }
    }
}
