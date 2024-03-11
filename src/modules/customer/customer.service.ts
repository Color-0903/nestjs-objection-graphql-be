import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './dtos/customer.dto';
import { DELETE_TYPE } from 'src/common/constants/enum';
import { Helper } from 'src/common/helper/base.service';
import { Customer } from 'src/database/models/customer.model';
import { ModelClass } from 'objection';

@Injectable()
export class CustomerService {
  private customerHelper: Helper<Customer>;

  constructor(
    @Inject('Customer') private readonly customerModel: ModelClass<Customer>,
  ) {
    this.customerHelper = new Helper(this.customerModel);
  }
  // async findAll(): Promise<CustomerModel[]> {
  //   return await this.customerHelper.findAll();
  // }

  async findOneById(id: string): Promise<Customer> {
    const response = await this.customerHelper.findById(id);
    if (!response) throw new NotFoundException();
    return response;
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    return await this.customerHelper.insert(dto);
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    return await this.customerHelper.update(id, dto);
  }

  async delete(id: string): Promise<String> {
    return await this.customerHelper.delete(id, DELETE_TYPE.HARD);
  }
}
