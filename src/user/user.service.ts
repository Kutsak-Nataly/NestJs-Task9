import { Injectable } from '@nestjs/common';
import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    };

    async getById(id: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ id });

    };

    async post(user: User): Promise<User | undefined> {
        const userHash = user;
        userHash.password = await bcrypt.hash(userHash.password, +process.env.CRYPT_SALT);
        return await this.userRepository.save(userHash);
    };

    async put(user: User): Promise<User | undefined> {
        const userHash = user;
        userHash.password = await bcrypt.hash(userHash.password, +process.env.CRYPT_SALT);
        return this.userRepository.save(userHash);
    };

    async deleteById(id: string): Promise<DeleteResult> {
        return await this.userRepository.delete({ id });
    };

    async addAdmin(login: string, password: string): Promise<User | undefined> {
        const passwordHash = await bcrypt.hash(password, +process.env.CRYPT_SALT);
        const adminHash: User = { name: '123', login, password: passwordHash };
        return await this.userRepository.save(adminHash);
    };

    async getByLogin(login: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ login });

    };
}
