import { Injectable, Logger } from '@nestjs/common'
import {
  AggregateOptions,
  BulkWriteOptions,
  CountDocumentsOptions,
  DeleteOptions,
  DistinctOptions,
  FindOptions,
  InsertOneOptions,
  ObjectId,
  UpdateOptions,
} from 'mongodb'
import { getMetadata } from '../../helpers/paging.helper'
import { isNullOrUndefined } from '../../helpers/util.helper'
import { PagingQuery } from '../../models/dto/pagination'
import { DbClientService } from './db-client.service'

export class BaseData {
  [prop: string]: any
}

export class ByIdData {
  _id: ObjectId
}

export class ByIdsData {
  _ids: ObjectId[]
}

@Injectable()
export class CommonQueryService {
  private readonly logger = new Logger(CommonQueryService.name)

  constructor(private dbClientService: DbClientService) {}

  _showQuery(data) {
    if (process.env.showStack === 'true') {
      this.logger.debug(new Error().stack)
    }
    if (process.env.showQuery === 'true') {
      this.logger.debug(data)
    }
  }

  _setIdsConditions(conditions: ByIdsData) {
    const _ids = []
    for (const id of conditions._ids) {
      _ids.push(new ObjectId(id))
    }
    delete conditions._ids
    const _conditions = {
      ...conditions,
      _id: { $in: _ids },
    }
    return _conditions
  }

  /**
   * @en Init Update Data
   * @zh 初始化 Update Data
   * @param update Data to insert
   * @param modifiedAt Modify time
   */
  _initUpdateData(update: any, modifiedAt: Date) {
    if (isNullOrUndefined(modifiedAt)) {
      return
    }
    if (!update.$set) {
      update.$set = {
        modifiedAt,
      }
    } else {
      update.$set.modifiedAt = modifiedAt
    }
  }

  /**
   * @en Insert One
   * @zh 單筆新增
   * @param createdAt Create time
   * @param collectionName Name of mongo collection
   * @param data Document to insert
   * @param options Collection Insert One Options
   */
  async insertOne(
    createdAt: Date,
    collectionName: string,
    data: any,
    options?: InsertOneOptions,
  ) {
    this._showQuery.call(this, data)
    data.createdAt = createdAt
    data.modifiedAt = createdAt
    const db = await this.dbClientService.getDb()
    const result = await db.collection(collectionName).insertOne(data, options)
    return result
  }

  /**
   * @en Insert Many
   * @zh 多筆新增
   * @param createdAt Create time
   * @param collectionName Name of mongo collection
   * @param data Documents to insert
   * @param options Collection Insert Many Options
   */
  async insertMany(
    createdAt: Date,
    collectionName: string,
    data: any[],
    options?: BulkWriteOptions,
  ) {
    this._showQuery.call(this, data)
    for (const item of data) {
      item.createdAt = createdAt
      item.modifiedAt = createdAt
    }
    const db = await this.dbClientService.getDb()
    const result = await db.collection(collectionName).insertMany(data, options)
    return result
  }

  /**
   * @en Update One By ID
   * @zh 使用 ID 單筆更新
   * @param modifiedAt Modify time
   * @param collectionName Name of mongo collection
   * @param conditions ID
   * @param update Update data
   * @param options Replace One Options
   */
  async updateOneById<T>(
    modifiedAt: Date | null,
    collectionName: string,
    conditions: ByIdData,
    update: any,
    options?: UpdateOptions,
  ) {
    const _conditions: any = {
      ...conditions,
      _id: new ObjectId(conditions._id),
    }
    const result = await this.updateOneByQuery<T>(
      modifiedAt,
      collectionName,
      _conditions,
      update,
      options,
    )
    return result
  }

  /**
   * @en Update One By ID
   * @zh 使用條件單筆更新
   * @param modifiedAt Modify time
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param update Update data
   * @param options Replace One Options
   */
  async updateOneByQuery<T>(
    modifiedAt: Date | null,
    collectionName: string,
    conditions: BaseData,
    update: any,
    options?: UpdateOptions,
  ) {
    this._initUpdateData(update, modifiedAt)
    this._showQuery.call(this, conditions)
    this._showQuery.call(this, update)
    const db = await this.dbClientService.getDb()
    const result = await db
      .collection<T>(collectionName)
      .updateOne(<any>conditions, update, options)
    return result
  }

  /**
   * @en Update Many By IDs
   * @zh 使用 IDs 多筆更新
   * @param modifiedAt Modify time
   * @param collectionName Name of mongo collection
   * @param conditions IDs
   * @param update Update data
   * @param options Replace Many Options
   */
  async updateManyByIds<T>(
    modifiedAt: Date | null,
    collectionName: string,
    conditions: ByIdsData,
    update: any,
    options?: UpdateOptions,
  ) {
    const _conditions = this._setIdsConditions(conditions)
    const result = await this.updateManyByQuery<T>(
      modifiedAt,
      collectionName,
      _conditions,
      update,
      options,
    )
    return result
  }

  /**
   * @en Update Many By Query
   * @zh 使用條件多筆更新
   * @param modifiedAt Modify time
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param update Update data
   * @param options Replace Many Options
   */
  async updateManyByQuery<T>(
    modifiedAt: Date | null,
    collectionName: string,
    conditions: BaseData,
    update: any,
    options?: UpdateOptions,
  ) {
    this._initUpdateData(update, modifiedAt)
    this._showQuery.call(this, conditions)
    this._showQuery.call(this, update)
    const db = await this.dbClientService.getDb()
    const result = await db
      .collection<T>(collectionName)
      .updateMany(<any>conditions, update, options)
    return result
  }

  /**
   * @en Delete One By ID
   * @zh 使用 ID 單筆刪除
   * @param collectionName Name of mongo collection
   * @param conditions ID
   * @param options Delete One Options
   */
  async deleteOneById<T>(
    collectionName: string,
    conditions: ByIdData,
    options?: DeleteOptions,
  ) {
    const _conditions: any = {
      ...conditions,
      _id: new ObjectId(conditions._id),
    }
    const result = await this.deleteOneByQuery<T>(
      collectionName,
      _conditions,
      options,
    )
    return result
  }

  /**
   * @en Delete One By Query
   * @zh 使用條件單筆刪除
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param options Delete One Options
   */
  async deleteOneByQuery<T>(
    collectionName: string,
    conditions: BaseData,
    options?: DeleteOptions,
  ) {
    this._showQuery.call(this, conditions)
    const db = await this.dbClientService.getDb()
    const result = await db
      .collection<T>(collectionName)
      .deleteOne(<any>conditions, options)
    return result
  }

  /**
   * @en Delete Many By IDs
   * @zh 使用 IDs 多筆刪除
   * @param collectionName Name of mongo collection
   * @param conditions IDs
   * @param options Collection Options
   */
  async deleteManyByIds<T>(
    collectionName: string,
    conditions: ByIdsData,
    options?: DeleteOptions,
  ) {
    const _conditions = this._setIdsConditions(conditions)
    const result = await this.deleteManyByQuery<T>(
      collectionName,
      _conditions,
      options,
    )
    return result
  }

  /**
   * @en Delete Many By Query
   * @zh 使用條件多筆刪除
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param options Collection Options
   */
  async deleteManyByQuery<T>(
    collectionName: string,
    conditions: BaseData,
    options?: DeleteOptions,
  ) {
    this._showQuery.call(this, conditions)
    const db = await this.dbClientService.getDb()
    const result = await db
      .collection<T>(collectionName)
      .deleteMany(<any>conditions, options)
    return result
  }

  /**
   * @en Find One By ID
   * @zh 使用 ID 單筆查詢
   * @param collectionName Name of mongo collection
   * @param conditions ID
   * @param options Find One Options
   */
  async findOneById<T>(
    collectionName: string,
    conditions: ByIdData,
    options?: FindOptions,
  ) {
    const _conditions: any = {
      ...conditions,
      _id: new ObjectId(conditions._id),
    }
    return this.findOneByQuery<T>(collectionName, _conditions, options)
  }

  /**
   * @en Find One By Query
   * @zh 使用條件單筆查詢
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param options Find One Options
   */
  async findOneByQuery<T>(
    collectionName: string,
    conditions: BaseData,
    options?: FindOptions,
  ) {
    this._showQuery.call(this, conditions)
    const db = await this.dbClientService.getDb()
    return db.collection<T>(collectionName).findOne<T>(<any>conditions, options)
  }

  /**
   * @en Find Many By IDs
   * @zh 使用 IDs 多筆查詢
   * @param collectionName Name of mongo collection
   * @param conditions IDs
   * @param options Find Many Options
   */
  async findManyByIds<T>(
    collectionName: string,
    conditions: ByIdsData,
    options?: FindOptions,
  ) {
    const _conditions = this._setIdsConditions(conditions)
    return this.findManyByQuery<T>(collectionName, _conditions, options)
  }

  /**
   * @en Find Many By Query
   * @zh 使用條件多筆查詢
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param options Find Many Options
   */
  async findManyByQuery<T>(
    collectionName: string,
    conditions: BaseData,
    options?: FindOptions,
  ) {
    this._showQuery.call(this, conditions)
    const db = await this.dbClientService.getDb()
    let dbQuery = db
      .collection<T>(collectionName)
      .find<T>(<any>conditions, options)
    if (options && options.sort) {
      dbQuery = dbQuery.sort(options.sort)
    }
    return dbQuery.toArray()
  }

  /**
   * @en Paging Query
   * @zh 分頁查詢
   * @description using sort() skip() limit(), so it's not suitable for the large document
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param url Query url
   * @param paging Page, Limit, and Sort querystring
   * @param options Find Many Options
   */
  async findWithPaging<T>(
    collectionName: string,
    conditions: BaseData,
    url: string,
    paging: PagingQuery,
    options?: FindOptions,
  ) {
    this._showQuery.call(this, conditions)
    const db = await this.dbClientService.getDb()
    const dbQuery = db
      .collection<T>(collectionName)
      .find<T>(<any>conditions, options)
    const _count = await this.count(collectionName, conditions)
    const metadata = getMetadata(_count, paging, url)
    const data = await dbQuery
      .sort(metadata.sort)
      .skip(paging.limit * (paging.page - 1))
      .limit(paging.limit)
      .toArray()
    return { data, metadata }
  }

  /**
   * @en Count
   * @zh 使用條件計算筆數
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param options Mongo Count Preferences options
   */
  async count<T>(
    collectionName: string,
    conditions: BaseData,
    options?: CountDocumentsOptions,
  ) {
    this._showQuery.call(this, conditions)
    const db = await this.dbClientService.getDb()
    return db
      .collection<T>(collectionName)
      .countDocuments(<any>conditions, options)
  }

  /**
   * @en distinct
   * @zh 獨特
   * @param collectionName Name of mongo collection
   * @param key Query conditions
   * @param conditions Query conditions
   * @param options Mongo Count Preferences options
   */
  async distinct<T>(
    collectionName: string,
    key: string,
    conditions?: BaseData,
    options?: DistinctOptions,
  ) {
    const db = await this.dbClientService.getDb()
    const result: T[] = <any>(
      db.collection<T>(collectionName).distinct(key, <any>conditions, options)
    )
    return result
  }

  /**
   * @en Aggregate
   * @zh 聚合
   * @param collectionName Name of mongo collection
   * @param conditions Query conditions
   * @param options Mongo Count Preferences options
   */
  async aggregate<T>(
    collectionName: string,
    pipeline: any[],
    options?: AggregateOptions,
  ) {
    const db = await this.dbClientService.getDb()
    return db
      .collection<T>(collectionName)
      .aggregate<T>(pipeline, options)
      .toArray()
  }

  async checkObjectIdExists(
    collectionName: string,
    idValue: ObjectId,
    fieldName: string = '_id',
  ) {
    const conditions = {
      [fieldName]: new ObjectId(idValue),
    }
    const item = await this.findOneByQuery(collectionName, conditions)
    return !isNullOrUndefined(item)
  }
}
