import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'src/database/models/customer.model';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dtos/customer.dto';

@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  // @Query(() => [Customer])
  // @UseGuards(JwtAuthGuard)
  // async findAllCustomer(): Promise<Customer[]> {
  //   return await this.customerService.findAll();
  // }

  // @Query(() => Customer)
  // async findCustomerById(@Args('id') id: string): Promise<Customer> {
  //   return await this.customerService.findOneById(id);
  // }

  // @Mutation(() => Customer)
  // async createCustomer(
  //   @Args('dto') dto: CreateCustomerDto,
  // ): Promise<Customer> {
  //   return await this.customerService.create(dto);
  // }

  // @Mutation(() => Customer)
  // async updateCustomer(
  //   @Args('id') id: string,
  //   @Args('dto') dto: UpdateCustomerDto,
  // ): Promise<Customer> {
  //   return await this.customerService.update(id, dto);
  // }

  // @Mutation(() => String)
  // async deleteCustomer(@Args('id') id: string): Promise<String> {
  //   return await this.customerService.delete(id);
  // }
}
