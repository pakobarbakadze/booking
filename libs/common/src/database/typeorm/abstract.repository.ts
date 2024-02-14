import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export abstract class TypeormAbstractRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  public create(item: DeepPartial<T>): T {
    return this.repository.create(item);
  }

  public save(item: T): Promise<T> {
    return this.repository.save(item);
  }

  public findBy(where: FindOptionsWhere<T>): Promise<T> {
    return this.repository.findOne(where);
  }

  public findAll(conditions?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(conditions);
  }

  public findAndCount(
    conditions?: FindManyOptions<T>,
  ): Promise<[T[], count: number]> {
    return this.repository.findAndCount(conditions);
  }

  public update(
    id: number,
    item: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, item);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
