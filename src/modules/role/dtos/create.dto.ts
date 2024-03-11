import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AbstractDto } from 'src/common/abstract/base.dto';

@InputType()
export class CreateRoleDto extends AbstractDto {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => String(value?.toString().trim()))
  name: string;

  @Field(() => [String])
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}

@InputType()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
