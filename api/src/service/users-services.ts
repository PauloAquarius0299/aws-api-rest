{/*import { UserRepository } from './../repository/user-repository';
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from '@root/domian/user.domian';
import {hash} from 'bcrypt';
interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt:Date;
    updatedAt:Date;
}

const SALT_ROUNDS = 10;

@Injectable()
export class UserServices {
    constructor(private readonly usersRepository: UserRepository) {}

    public async createUser(params: CreateUserParams): Promise<string> {
        const userExists: IUser = await this.usersRepository.getUserByEmail(params.email);

        if(userExists){
            throw new BadRequestException('Usuario já existe')
        }

        const passwordHash = await hash(params.password, 10)

        const user = new User({
            name: params.name,
            email: params.email,
            password: passwordHash,
        });

        await this.usersRepository.createUser(user)

        return user.id;
    }

    public async getUserByID(userID: string): Promise<IUser>{
        const user: User = await this.usersRepository.getUserByID(userID);

        if(!user){
            throw new BadRequestException('Usuario não encontrado')
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}*/}

import { UserRepository } from './../repository/user-repository';
import { ConflictException, NotFoundException, Injectable } from "@nestjs/common";
import { User } from '@root/domian/user.domian';
import { hash } from 'bcrypt';

interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const SALT_ROUNDS = 10;

@Injectable()
export class UserServices {
    constructor(private readonly usersRepository: UserRepository) {}

    public async createUser(params: CreateUserParams): Promise<string> {
        const userExists: IUser = await this.usersRepository.getUserByEmail(params.email);

        if (userExists) {
            throw new ConflictException('Usuário já existe');
        }

        const passwordHash = await hash(params.password, SALT_ROUNDS);

        const user = new User({
            name: params.name,
            email: params.email,
            password: passwordHash,
        });

        await this.usersRepository.createUser(user);

        return user.id;
    }

    public async getUserByID(userID: string): Promise<IUser> {
        const user: User = await this.usersRepository.getUserByID(userID);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}
