import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { USER_TYPE } from 'src/common/constants/enum';

@InputType()
export class LoginDto  {
  @Field({ nullable: false })
  @IsNotEmpty()
  @Transform(({ value }) => String(value?.toString().trim().toLowerCase()))
  @IsString()
  identifier: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @Length(8, 255)
  @Matches(/^[A-Za-z\d#$@!%&*?.]{8,16}$/)
  @Transform(({ value }) => String(value?.toString().trim()))
  password?: string;
  
  @Field({ nullable: false })
  @IsEnum(USER_TYPE)
  @IsNotEmpty()
  type: USER_TYPE;
}
