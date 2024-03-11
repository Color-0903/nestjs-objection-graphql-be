import { InputType } from '@nestjs/graphql';

@InputType()
export class UserReqDto {
  id: string;
  identifier: String;
}
