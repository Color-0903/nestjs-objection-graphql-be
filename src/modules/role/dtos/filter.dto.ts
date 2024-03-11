import { InputType } from "@nestjs/graphql";
import { Filter } from "src/common/dtos/filter.dto";

@InputType()
export class FilterRoleDto extends Filter{}