import {v4 as uuid} from 'uuid';

interface UserProps {
    email: string;
    name:  string;
    password: string
}

type UserUpdate = Partial<User & UserProps>;

export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public password: string;
    public readonly createdAt: Date;
    public updatedAt: Date;

    constructor(init: UserUpdate){
        Object.assign(
            this, 
            {
                id: uuid(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            init,
        )
    }
}