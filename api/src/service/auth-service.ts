import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "@root/repository/user-repository";
import { JWT_SECRET } from "@root/shared/constantes";
import { TokenPayload } from "@root/shared/types";
import { compare } from 'bcrypt';

interface Credentials {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    public async login(credentials: Credentials): Promise<string> {
        const { email, password } = credentials;

        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: TokenPayload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hora
            iat: Math.floor(Date.now() / 1000),
        };

        const token = await this.jwtService.signAsync(payload, {
            secret: JWT_SECRET,
        });

        return token;
    }
}
