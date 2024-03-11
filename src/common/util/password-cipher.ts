import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 12;
@Injectable()
export class PasswordCipher {
  hash(plaintext: string): Promise<string> {
    return bcryptjs.hash(plaintext, SALT_ROUNDS);
  }

  check(plaintext: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(plaintext, hash);
  }
}
