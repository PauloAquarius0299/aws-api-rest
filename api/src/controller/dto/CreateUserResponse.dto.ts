import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersResponseDTO {
    @ApiProperty({
        description: 'Esse id foi criado com sucesso',
        example: 'random-id'
    })
    public id: string;

    constructor(id: string){
        this.id = id
    }
}