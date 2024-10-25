import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty} from 'class-validator'

export class CreateUsersRequestDTO {
    @ApiProperty({
        description: 'O nome foi criado com sucesso',
        example: 'Paulo Cesar',
    })
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        description: 'O email foi criado com sucesso',
        example: 'paulo12@.com',
    })
    @IsNotEmpty()
    public email: string;

    @ApiProperty({
        description: 'A senha foi criado com sucesso',
        example: '1234',
    })
    @IsNotEmpty()
    public password: string;
}