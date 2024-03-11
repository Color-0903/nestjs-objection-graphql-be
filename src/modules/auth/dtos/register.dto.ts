import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

@InputType()
export class RegisterDto {
  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => String(value?.toString().trim().toLowerCase()))
  emailAddress: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @Length(8, 255)
  @Matches(/^[A-Za-z\d#$@!%&*?.]{8,16}$/)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(4, 4)
  otpCode?: string;
}
