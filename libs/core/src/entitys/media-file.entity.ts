import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ObjectId } from 'bson';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { Column, Entity, JoinColumn, ObjectID, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  FileType,
  MediaStatus,
  MediaTranscodeStatus,
  SocialSource,
} from '../common';

@Entity({
  name: 'media_files',
  orderBy: {
    createdAt: 'DESC',
  },
})
@ObjectType()
export class MediaFileEntity extends BaseEntity {
  @Field({ description: 'title' })
  @Column()
  @Expose()
  title: string;

  @Field({ description: 'description', nullable: true })
  @Column()
  @Expose()
  description?: string;

  @Field({ description: 'copyright', nullable: true })
  @Column()
  @Expose()
  copyright?: string;

  @Expose()
  @Field(() => SocialSource, { nullable: true })
  @Column('enum', {
    enum: SocialSource,
    default: SocialSource.OTHER,
    nullable: false,
  })
  sourceType: SocialSource;

  @Expose()
  @Field(() => FileType, { nullable: true })
  @Column('enum', {
    enum: FileType,
    default: FileType.FILE,
    nullable: false,
  })
  fileType: FileType;

  @Expose()
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  categoryId?: ObjectID;

  // @Expose()
  // @Field(() => MediaCategoryEntity, { nullable: true })
  // @Column({ nullable: true })
  // category?: MediaCategoryEntity;

  @Transform(({ value }) => new ObjectId(value))
  @Expose()
  @Field(() => ID)
  @Column()
  storageId: ObjectID;

  // @Field(() => FileStorageEntity, { nullable: true })
  // storage?: FileStorageEntity;

  @Transform(({ value }) => new ObjectId(value))
  @Expose()
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  projectId?: ObjectID;

  // @Field(() => ProjectEntity, { nullable: true })
  // project?: ProjectEntity;

  @Expose()
  @Field(() => MediaStatus, { nullable: true })
  @Column({ nullable: true, default: MediaStatus.DRAFT })
  status: MediaStatus = MediaStatus.DRAFT;

  @Field(() => MediaTranscodeStatus, { nullable: true })
  transcodeStatus?: MediaTranscodeStatus;

  @Transform(({ value }) => new ObjectId(value))
  @Expose()
  @Field(() => ID, { nullable: true })
  @Column()
  transcodeId?: ObjectID;

  // @Field(() => [MediaTranscodeEntity], { nullable: 'itemsAndList' })
  // transcode?: MediaTranscodeEntity[];

  // subtitle?: MediaSubtitleEntity[];

  // @Field(() => [MediaSubtitleResponse], { nullable: 'itemsAndList' })
  // listSubtitle?: MediaSubtitleResponse[];

  @Transform(({ value }) => value && new ObjectId(value))
  @Expose()
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  accessControlId: ObjectID;

  // @Field(() => AccessControlEntity, { nullable: true })
  // accessControl?: AccessControlEntity;

  // @Field(() => MediaAccessControlEntity, { nullable: true })
  // mediaAccessControl?: MediaAccessControlEntity;

  @Expose()
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  introId?: ObjectID;

  @Expose()
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  endTroId?: ObjectID;

  @Expose()
  @Field(() => [String], { nullable: 'itemsAndList' })
  @Column({
    type: 'array',
    nullable: true,
  })
  tags?: string[] = [];

  @Expose()
  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  thumbnailId?: ObjectID;

  @Expose()
  @Field(() => MediaFileEntity, { nullable: true })
  @Column({ nullable: true })
  thumbnail?: MediaFileEntity;

  @Expose()
  @Field(() => [ID], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  thumbnailIds?: ObjectID[];

  @Expose()
  @Field(() => [MediaFileEntity], {
    nullable: 'itemsAndList',
    defaultValue: [],
  })
  @Column({ nullable: true })
  thumbnails?: MediaFileEntity[];

  // @Field(() => UserEntity, { nullable: true })
  // createdByUser?: UserEntity;

  // @Field(() => [MediaGroupMetadataEntity], { nullable: 'itemsAndList' })
  // groupMetadata?: MediaGroupMetadataEntity[];

  constructor(media: Partial<MediaFileEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(MediaFileEntity, media, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
