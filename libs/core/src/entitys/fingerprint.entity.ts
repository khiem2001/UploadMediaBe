import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'bson';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({
  name: 'finger_print',
  orderBy: {
    createdAt: 'DESC',
  },
})
@ObjectType()
export class FingerPrintEntity extends BaseEntity {
  @Field(() => ID, { description: 'id', name: 'id' })
  @ObjectIdColumn({ type: 'uuid', name: '_id' })
  @Expose()
  _id?: ObjectID;

  @Field({ description: 'fingerPrintId' })
  @Column()
  @Expose()
  fingerPrintId: string;

  @Transform(({ value }) => new ObjectId(value))
  @Expose()
  @Field(() => ID)
  @Column()
  storageId: ObjectID;

  @Field({ description: 'fileName' })
  @Column()
  @Expose()
  fileName: string;

  constructor(encode: Partial<FingerPrintEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(FingerPrintEntity, encode, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
