import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelClass } from 'objection';
import { USER_TYPE } from 'src/common/constants/enum';
import { Helper } from 'src/common/helper/base.service';
import { PasswordCipher } from 'src/common/util/password-cipher';
import { Customer } from 'src/database/models/customer.model';
import { Role } from 'src/database/models/role.model';
import { User } from 'src/database/models/user.model';
import { Permission } from '../permission';
import { LoginDto } from './dtos/login.dto';
import { NativeAuthenticationStrategy } from './strategies/native-authentication-strategy';

@Injectable()
export class AuthService {
  private userHelper: Helper<User>;
  private roleHelper: Helper<Role>;
  private customerHelper: Helper<Customer>;

  constructor(
    private jwtService: JwtService,
    private passwordCipher: PasswordCipher,

    @Inject('User') private readonly userModel: ModelClass<User>,
    @Inject('Role') private readonly roleModel: ModelClass<Role>,
    @Inject('Customer') private readonly customerModel: ModelClass<Customer>,
  ) {
    this.userHelper = new Helper(this.userModel);
    this.roleHelper = new Helper(this.roleModel);
    this.customerHelper = new Helper(this.customerModel);
  }

  async authenticate(dto: LoginDto) {
    const authenticationStrategy = new NativeAuthenticationStrategy(
      this.passwordCipher,
      this.userHelper
    );
    const result = await authenticationStrategy.authenticate(dto.type, {
      identifier: dto.identifier,
      password: dto.password,
    });
    if (!result)
      throw new BadRequestException('IDENTIFIER_OR_PASSWORD_IS_WRONG');
    return this.encode(result);
  }

  public async register(dto: any): Promise<User> {
    const [findUser, authenticatedRole] = await Promise.all([
      this.userHelper.findOneBy({
        identifier: dto.emailAddress,
        type: USER_TYPE.CUSTOMER,
      }),
      this.roleHelper.findOneBy({
        name: Permission.Customer.name,
      }),
    ]);

    if (!!findUser?.id) throw new ConflictException('IDENTIFIER_IS_USED');
    const userParams = {
      identifier: dto.emailAddress,
      type: USER_TYPE.CUSTOMER,
      password: await this.passwordCipher.hash(dto.password),
      customer: { emailAddress: dto.emailAddress },
      user_role: [{ roleId: authenticatedRole.id }],
    };

    const userRecord = await this.userHelper.insert(userParams, true);
    if (!userRecord?.id) throw new BadRequestException('FAILSE_CREATE_USER');

    return userRecord;
  }

  public async profile(userId: string): Promise<User> {
    return await this.userHelper.findById(userId, ['roles', 'customer']);
  }

  private encode(user: User) {
    const token = this.generateToken(user);
    return {
      token,
    };
  }

  public decode(token: string) {
    try {
      const jwt = token.replace('Bearer ', '');
      return this.jwtService.decode(jwt, { json: true }) as User;
    } catch (e) {
      return null;
    }
  }

  public generateToken(user: User) {
    const payload = {
      id: user.id,
      identifier: user.identifier,
    };

    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  //   public verifyToken(payload: VerifyTokenDto): SuccessResponseDto {
  //     const result = this.verificationTokenGenerator.verifyVerificationToken(payload.token);
  //     return { success: result };
  //   }
}
