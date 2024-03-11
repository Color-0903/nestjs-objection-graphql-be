import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@InputType()
export class Filter {
  @Field((type) => Number, { nullable: false })
  @Transform(({ value }) => Number(value))
  page: number;

  @Field((type) => Number, { nullable: true })
  size?: number;

  @Field((type) => String, { nullable: true })
  sort?: string;
}
