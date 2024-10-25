import { ApiProperty } from "@nestjs/swagger";

export class AuthenticationUserRequestDTO{
    @ApiProperty({
        description: 'O email foi criado com sucesso',
        example: 'paulo12@.com',
    })
    public email: string;

    @ApiProperty({
        description: 'A senha foi criado com sucesso',
        example: '1234',
    })
    public password: string;
}