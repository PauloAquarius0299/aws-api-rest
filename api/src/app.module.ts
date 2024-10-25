import { Module } from '@nestjs/common';
import { UsersController } from './controller/user-controller';
import { UserServices } from './service/users-services';
import { UserRepository } from './repository/user-repository';
import { AuthController } from './controller/auth-controller';
import { AuthService } from './service/auth-service';
import {JwtModule} from '@nestjs/jwt';
import { AuthGuard } from './shared/auth-guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    })
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UserServices, 
    UserRepository, 
    AuthService,
    {
      provide: "APP_GUARD",
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
