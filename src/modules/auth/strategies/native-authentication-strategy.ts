import { USER_TYPE } from 'src/common/constants/enum';
import { PasswordCipher } from '../../../common/util/password-cipher';
import { AuthenticationStrategy } from './authentication-strategy';
import { Helper } from 'src/common/helper/base.service';
import { User } from 'src/database/models/user.model';

export interface AuthenticationData {
  identifier: string;
  password: string;
}

/**
 * @description
 * This strategy implements a username/password credential-based authentication, with the credentials
 * being stored in the Vendure database. This is the default method of authentication, and it is advised
 * to keep it configured unless there is a specific reason not to.
 *
 * @docsCategory auth
 */
export class NativeAuthenticationStrategy
  implements AuthenticationStrategy<AuthenticationData>
{
  private userHelper: Helper<User>;
  private passwordCipher: PasswordCipher;

  constructor(passwordCipher, userHelper) {
    this.passwordCipher = passwordCipher;
    this.userHelper = userHelper;
  }

  async authenticate(
    userType: USER_TYPE,
    data: AuthenticationData,
  ): Promise<any> {
    const user = await this.userHelper.findOneBy({
      identifier: data.identifier,
      type: userType,
    });
    if (!user) {
      return false;
    }
    const passwordMatches = await this.passwordCipher.check(
      data.password,
      user.password,
    );
    if (!passwordMatches) {
      return false;
    }
    return user;
  }
}
