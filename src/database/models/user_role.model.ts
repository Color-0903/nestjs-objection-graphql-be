import { Column, Table, columnTypes } from 'nestjs-objection';
import { BaseModel } from './base.model';

@Table({ tableName: 'user_role' })
export class User_Role extends BaseModel {
  @Column({ type: columnTypes.string })
  id: string;

  @Column({ type: columnTypes.string })
  userId: string;

  @Column({ type: columnTypes.string })
  roleId: string;
}
