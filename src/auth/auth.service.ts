import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async validateUser(login: string, password: string): Promise<boolean> {
        const user = await this.userService.getByLogin(login);
        return bcrypt.compare(password, user.password);
    }

    getToken(authHeader: string | undefined): string | boolean {
        if (authHeader) {
            const [author, token] = authHeader.split(' ');
            if (token && (author === 'Bearer')) {
                return token;
            }
            return false;
        }
        return false;
    };

    async login(login: string, password: string) {
        const payload = { login, password };
        return {
            token: this.jwtService.sign(payload),
        };
    }

}
