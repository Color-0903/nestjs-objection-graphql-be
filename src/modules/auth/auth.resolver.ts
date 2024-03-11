import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { TokenResponse } from './models/token';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserReq } from 'src/common/decorators/user.decorator';
import { UserReqDto } from 'src/common/dtos/userReq.dto';
import { Allow } from './guard/allow.decorator';
import { Permission } from '../permission';
import { User } from 'src/database/models/user.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => TokenResponse)
  async login(@Args('dto') dto: LoginDto): Promise<TokenResponse> {
    return this.authService.authenticate(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Authenticated)
  @Query(() => User)
  async customerMe(@UserReq() userReq: User): Promise<User> {
    return await this.authService.profile(userReq.id);
  }

  @Mutation(() => User)
  async register(@Args('dto') dto: RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }
}
