import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationUserRequestDTO } from "./dto/authentication-user-request.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "@root/service/auth-service";
import { AuthenticationUserResponseDTO } from "./dto/authenticate-user-response.dto";
import { Public } from "@root/shared/public-decorator";

@Controller('auth')
@ApiTags('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {};

    @Public()
    @Post('login')
    public async login(
        @Body() credentials: AuthenticationUserRequestDTO,
    ): Promise<any>{
        const token = await this.authService.login({
            email: credentials.email,
            password: credentials.password
        })
        return new AuthenticationUserResponseDTO(token)
    }
};