import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length, MaxLength } from 'class-validator';
import { CommonDto } from "src/common/dtos/common.dto";

@InputType()
export class CreateCustomerDto extends CommonDto { }

@InputType()
export class UpdateCustomerDto extends OmitType(CreateCustomerDto, ['password'] as const) {}