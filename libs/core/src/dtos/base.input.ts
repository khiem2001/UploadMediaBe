import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Expose, Transform, Type, plainToClass } from 'class-transformer';
import { ObjectID, ObjectId } from 'mongodb';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class IdCustom {
  @Type(() => ObjectID)
  @Transform(({ value }) => new ObjectId(value))
  @Field(() => ID)
  @Expose()
  @IsMongoId()
  id: ObjectID;

  constructor(input: Partial<IdCustom>) {
    // super();
    Object.assign(
      this,
      plainToClass(IdCustom, input, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
