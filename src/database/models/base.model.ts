import { Field, ObjectType } from '@nestjs/graphql';
import { Model, Column, columnTypes } from 'nestjs-objection';

@ObjectType()
export class BaseModel extends Model {
  @Column({ type: columnTypes.string })
  @Field((type) => String)
  id: string;

  @Column({ type: columnTypes.date || null })
  @Field({ nullable: true })
  createdOnDate: string | null;

  @Column({ type: columnTypes.string || null })
  @Field({ nullable: true })
  createByUserId: string | null;

  @Column({ type: columnTypes.date || null })
  @Field({ nullable: true })
  lastModifiedOnDate: Date | null;

  @Column({ type: columnTypes.date || null })
  @Field({ nullable: true })
  lastModifiedByUserId: Date | null;

  @Column({ type: columnTypes.date || columnTypes.boolean })
  @Field({ nullable: true })
  deleteAt: Date | null;
}
