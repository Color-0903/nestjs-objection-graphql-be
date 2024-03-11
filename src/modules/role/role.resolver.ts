import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { paginationResponse } from 'src/common/util/pagination';
import { Role } from 'src/database/models/role.model';
import { FilterRoleDto } from './dtos/filter.dto';
import { CreateRoleDto, UpdateRoleDto } from './dtos/create.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Allow } from '../auth/guard/allow.decorator';
import { Permission } from '../permission';
import { UserReqDto } from 'src/common/dtos/userReq.dto';
import { UserReq } from 'src/common/decorators/user.decorator';

@Resolver('Role')
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => paginationResponse<Role>)
  async finAllRole(
    @Args('filter') filter: FilterRoleDto,
  ): Promise<paginationResponse<Role>> {
    return await this.roleService.findAll(filter);
  }

  @Query(() => Role)
  async findRoleById(@Args('id') id: string): Promise<Role> {
    return await this.roleService.findById(id);
  }

  @Mutation(() => Role)
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Authenticated)
  async createRole(
    @Args('dto') dto: CreateRoleDto,
    @UserReq() userReq: UserReqDto,
  ): Promise<Role> {
    return this.roleService.create({ ...dto, createByUserId: userReq.id });
  }

  @Mutation(() => Role)
  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Authenticated)
  async updatRole(
    @Args('id') id: string,
    @Args('dto') dto: UpdateRoleDto,
    @UserReq() userReq: UserReqDto,
  ): Promise<Role> {
    return await this.roleService.update(id, {
      ...dto,
      lastModifiedByUserId: userReq.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Allow(Permission.Authenticated)
  @Mutation(() => String)
  async deleteRole(@Args('id') id: string): Promise<String> {
    return await this.roleService.delete(id);
  }
}
