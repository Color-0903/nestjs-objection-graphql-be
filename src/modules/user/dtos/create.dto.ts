import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, Length, Matches, MaxLength } from 'class-validator';
import { USER_TYPE } from "src/common/constants/enum";
import { CommonDto } from "src/common/dtos/common.dto";

@ObjectType()
export class CreateUserDto extends PickType(CommonDto, ['password'] as const) {
  @Field({ nullable: false })
  @IsNotEmpty()
  @MaxLength(255)
  identifier: string;

  @Field({ nullable: false })
  @IsEnum(USER_TYPE)
  @IsNotEmpty() 
  type: USER_TYPE;

  @Field()
  @IsBoolean()
  @IsOptional()
  isActive?: Boolean;

  @Field()
  @IsBoolean()
  @IsOptional()
  verified?: Boolean;
}

@InputType()
export class UpdateCustomerDto extends PartialType(CreateUserDto) {}