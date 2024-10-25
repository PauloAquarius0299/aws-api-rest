import { Body, Controller, Get, HttpStatus, Param, Post, Req } from "@nestjs/common";
import { CreateUsersRequestDTO } from "./dto/CreateUsersRequest.dto";
import { CreateUsersResponseDTO } from "./dto/CreateUserResponse.dto";
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import { UserServices } from "@root/service/users-services";
import { GetUserByIDResponseDTO } from "./dto/GetUserByIDResponse.dto";
import { AuthenticateRequest } from "@root/shared/types";
import { Public } from "@root/shared/public-decorator";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersServices: UserServices) {}

    @Public()
    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Usuario criado',
        type: CreateUsersResponseDTO,
    })
    public async createUser(
        @Body() createUserBody: CreateUsersRequestDTO): Promise<CreateUsersResponseDTO> {
            const createUserID = await this.usersServices.createUser({
                name: createUserBody.name,
                email: createUserBody.email,
                password: createUserBody.password,
            })
        return new CreateUsersResponseDTO(createUserID);
    }

    @Get(':userID')
    @Public()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario encontrado',
        type: GetUserByIDResponseDTO,
    })
    public async getUserByID(@Param(`userID`) userID: string): Promise<GetUserByIDResponseDTO>{
        const userResult = await this.usersServices.getUserByID(userID);

        return new GetUserByIDResponseDTO({
            id: userResult.id,
            name: userResult.name,
            email: userResult.email,
            createdAt: userResult.createdAt.toISOString(),
            updatedAt: userResult.updatedAt.toISOString(),
        })
    }

    @Get('me')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario encontrado',
        type: GetUserByIDResponseDTO,
    })
    public async getMe(@Req() request: AuthenticateRequest): Promise<GetUserByIDResponseDTO> {
        return this.getUserByID(request.userID)
    }
}