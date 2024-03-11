import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field((type) => String)
  token: string;
}
