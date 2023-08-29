import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'bson';
import { Expose, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
  ObjectID,
} from 'typeorm';

@ObjectType()
export abstract class BaseEntity {
  @Field(() => ID, { description: 'id', name: 'id' })
  @ObjectIdColumn({ type: 'uuid', name: '_id' })
  @Expose()
  _id?: ObjectID;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  @Transform(({ value }) => new ObjectId(value), { toClassOnly: true })
  @Expose()
  createdBy?: ObjectID;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn()
  @Expose()
  createdAt!: Date;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  updatedBy?: ObjectID;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  deletedBy?: ObjectID;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  @Expose()
  deletedAt?: Date;

  @Field({ nullable: true })
  @Column()
  version?: number;

  // toDtoClass?: new (entity: BaseEntity, options?: any) => T;
}
