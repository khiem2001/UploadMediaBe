import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectID } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsActive, MediaTranscodeStatus, ResolutionType } from '../common';

@Entity({
  name: 'media_transcode',
  orderBy: {
    createdAt: 'DESC',
  },
})
@ObjectType()
export class MediaTranscodeEntity extends BaseEntity {
  @Field(() => ID, { description: 'mediaId' })
  @Column()
  @Expose()
  mediaId: ObjectID;

  @Field(() => String, { description: 'name' })
  @Column()
  @Expose()
  name!: string;

  @Field(() => String)
  @Column('enum', {
    enum: ResolutionType,
    nullable: true,
  })
  @Expose()
  resolution!: ResolutionType;

  @Field()
  @Column()
  @Expose()
  bitrate!: string;

  @Field(() => MediaTranscodeStatus, { description: 'status' })
  @Column('enum', {
    enum: MediaTranscodeStatus,
    default: MediaTranscodeStatus.WAITING,
    nullable: false,
  })
  @Expose()
  status: MediaTranscodeStatus = MediaTranscodeStatus.WAITING;

  @Field(() => IsActive, { description: 'logo' })
  @Column({ type: 'boolean' })
  @Expose()
  isActiveLogo: IsActive = IsActive.DeActive;

  @Field(() => String, { nullable: true })
  @Column()
  @Expose()
  format!: string;

  @Field(() => String, { nullable: true })
  @Column()
  @Expose()
  encode!: string;

  @Field(() => String, { nullable: true })
  @Column()
  @Expose()
  encodeName!: string;

  constructor(mediaTranscode: Partial<MediaTranscodeEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(MediaTranscodeEntity, mediaTranscode, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
