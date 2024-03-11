import { USER_TYPE } from 'src/common/constants/enum';
import { InjectableStrategy } from '../../../common/types/injectable-strategy';
import { User } from 'aws-sdk/clients/budgets';

export interface AuthenticationStrategy<Data = unknown> extends InjectableStrategy {
  authenticate(userType: USER_TYPE, data: Data): Promise<User | false | string>;
  onLogOut?(user: User): Promise<void>;
}
