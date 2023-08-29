import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ResolutionType, StorageStatus } from '../common';

@ObjectType()
class Thumbnail {
  @Field({ description: 'choose your thumbnail' })
  @Column()
  @Expose()
  default!: string;

  @Field(() => [String], { description: 'option to choose your thumbnail ' })
  @Column()
  @Expose()
  options!: string[];
}

@Entity({
  name: 'file_storage',
  orderBy: {
    createdAt: 'DESC',
  },
})
@ObjectType()
export class FileStorageEntity extends BaseEntity {
  @Field({ description: 'fileName' })
  @Column()
  @Expose()
  fileName!: string;

  @Field({ description: 'originalName' })
  @Column()
  @Expose()
  originalName!: string;

  @Field({ description: 'mimeType' })
  @Column()
  @Expose()
  mimeType!: string;

  @Field({ description: 'size', nullable: true })
  @Column({ type: 'int' })
  @Expose()
  size!: number;

  @Field(() => String, { description: 'resolution', nullable: true })
  @Column('enum', {
    enum: ResolutionType,
    nullable: true,
  })
  @Expose()
  resolution: ResolutionType;

  @Field({ description: 'source', nullable: true })
  @Column()
  @Expose()
  source?: string;

  @Field({ description: 'duration', nullable: true })
  @Column({ type: 'int' })
  @Expose()
  duration?: number;

  @Field({ description: 'bitRate', nullable: true })
  @Column({ type: 'int' })
  @Expose()
  bitRate?: number;

  @Field({ description: 'path' })
  @Column()
  @Expose()
  path!: string;

  @Field(() => StorageStatus, { description: 'status' })
  @Column('enum', {
    enum: StorageStatus,
    default: StorageStatus.WAITING,
    nullable: false,
  })
  @Expose()
  status: StorageStatus = StorageStatus.WAITING;

  @Field(() => Thumbnail, { description: 'thumbnail', nullable: true })
  @Column(() => Thumbnail)
  @Expose()
  thumbnails!: Thumbnail;

  constructor(storage: Partial<FileStorageEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(FileStorageEntity, storage, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
