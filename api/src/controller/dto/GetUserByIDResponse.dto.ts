import { ApiProperty } from "@nestjs/swagger";

export class GetUserByIDResponseDTO {
    @ApiProperty({
        name: 'id',
        description: 'id do usuario',
        example: "c21a71b4-6b74-4f28"
    })
    public id: string;

    @ApiProperty({
        name: 'name',
        description: 'nome do usuario',
        example: "Fulano de tal"
    })
    public name: string;

    @ApiProperty({
        name: 'email',
        description: 'email do usuario',
        example: "Fulano@12.com"
    })
    public email: string;

    @ApiProperty({
        name: 'createdAt',
        description: 'quando o usuario é criado',
        example: "2024-10-20-01T00:00:002"
    })
    public createdAt: string;

    @ApiProperty({
        name: 'updatedAt',
        description: 'quando o usuario é atualizado',
        example: "2024-10-20-01T00:00:002"
    })
    public updatedAt: string;

    constructor(params: GetUserByIDResponseDTO) {
        this.id = params.id;
        this.name = params.name;
        this.email = params.email;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}