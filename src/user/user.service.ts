import { Injectable } from '@nestjs/common';
import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private configService: ConfigService
    ) {
    }

    async getAll(): Promise<User[]> {
        return await this.usersRepository.find();
    };

    async getById(id: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({ id });

    };

    // async getByLogin(login: string): Promise<User | undefined> {
    //     return await this.usersRepository.findOne({ login });
    // };

    async post(user: User): Promise<User> {
        const userHash = user;
        userHash.password = await bcrypt.hash(userHash.password, +this.configService.get('CRYPT_SALT'));
        return await this.usersRepository.save(userHash);
    };

    async put(user: User): Promise<User> {
        const userHash = user;
        userHash.password = await bcrypt.hash(userHash.password, +this.configService.get('CRYPT_SALT'));
        return this.usersRepository.save(userHash);
    };

    async deleteById(id: string): Promise<DeleteResult> {
        return await this.usersRepository.delete({ id });
    };
}
