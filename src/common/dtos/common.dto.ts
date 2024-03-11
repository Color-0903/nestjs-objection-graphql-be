import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

@ObjectType()
export class CommonDto {
  @Field({ nullable: false })
  @IsString()
  @Length(36, 36)
  @Transform(({ value }) => String(value?.toString().trim()))
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @Transform(({ value }) => String(value?.toString().trim()))
  fullName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => String(value?.toString().trim().toLowerCase()))
  emailAddress: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => String(value?.toString().trim()))
  dob?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => String(value?.toString().trim()))
  phoneNumber?: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @Length(8, 255)
  @Matches(/^[A-Za-z\d#$@!%&*?.]{8,16}$/)
  password?: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @Length(36, 36)
  @Transform(({ value }) => String(value?.toString().trim()))
  userId: string;
}
