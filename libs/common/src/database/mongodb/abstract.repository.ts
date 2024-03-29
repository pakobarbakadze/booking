import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class MongoAbstractRepository<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  public async createAndSave(document: Partial<T>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  public async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  public async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  public async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>(true);
  }

  public async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndDelete(filterQuery).lean<T>(true);
  }
}
