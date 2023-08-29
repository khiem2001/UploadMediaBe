import { ObjectId } from 'bson';
import { FindManyOptions, MongoRepository, ObjectID } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IdCustom } from '../dtos';

export interface IBaseRepositoryInterface<T> {
  index(): Promise<T[]>;
  findById(id: ObjectID): Promise<T>;
  getByIds(id: EntityId[]): Promise<T[]>;
}
export abstract class BaseRepository<T>
  extends MongoRepository<T>
  implements IBaseRepositoryInterface<T> {
  /**
   *
   * @param optionsOrConditions
   * @returns
   */
  index(optionsOrConditions?: FindManyOptions<T> | Partial<T>): Promise<T[]> {
    const connection = this.manager.connection;
    const metadata = this.metadata;
    if (
      metadata.deleteDateColumn &&
      optionsOrConditions &&
      'withDeleted' in optionsOrConditions &&
      !optionsOrConditions.withDeleted
    ) {
      if (!optionsOrConditions.where) optionsOrConditions.where = {};
      optionsOrConditions.where[
        connection.driver.escape(metadata.deleteDateColumn.databaseName)
      ] = null;
      return this.find(optionsOrConditions);
    } else {
      return this.find(optionsOrConditions);
    }
  }
  /**
   *
   * @param id
   * @returns
   */
  findById(id: any): Promise<T> {
    const _id = new IdCustom({
      id,
    });
    return this.findOne({
      where: {
        _id: typeof id === 'string' ? _id.id : id,
        deletedAt: null,
      },
    });
  }

  /**
   *
   * @param ids
   * @returns
   */
  getByIds(ids: ObjectID[]): Promise<T[]> {
    const _ids = ids.map((id) => new ObjectId(id));

    return this.find({
      where: {
        _id: { $in: _ids },
        deletedAt: null,
      },
    });
  }

  /**
   *
   * @param optionsOrConditions
   * @returns
   */
  async allAndCount(optionsOrConditions?: FindManyOptions<T> | Partial<T>) {
    const connection = this.manager.connection;
    const metadata = this.metadata;
    if (
      metadata.deleteDateColumn &&
      optionsOrConditions &&
      'withDeleted' in optionsOrConditions &&
      !optionsOrConditions.withDeleted
    ) {
      if (!optionsOrConditions.where) optionsOrConditions.where = {};
      optionsOrConditions.where[
        connection.driver.escape(metadata.deleteDateColumn.databaseName)
      ] = null;
      return this.findAndCount(optionsOrConditions);
    } else {
      return this.findAndCount(optionsOrConditions);
    }
  }
}
