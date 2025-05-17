import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Db, MongoClient } from 'mongodb'

@Injectable()
export class DbClientService {
  private _client: MongoClient = null
  private _db: Db = null
  private readonly logger = new Logger(DbClientService.name)

  constructor(private configService: ConfigService) {}

  private async connectToDb(dbName?: string) {
    const conn = process.env.CONN || this.configService.get('CONN')
    this.logger.debug(`connect to ${conn}`)
    this._client = await MongoClient.connect(conn)
    this._db = this._client.db(dbName)
  }

  async getClient(dbName?: string) {
    if (this._client) {
      return this._client
    }
    await this.connectToDb(dbName)
    return this._client
  }

  async getDb(dbName?: string) {
    if (this._db) {
      return this._db
    }
    await this.connectToDb(dbName)
    return this._db
  }

  async closeDb() {
    if (this._client) {
      await this._client.close()
    }
  }

  async onModuleInit() {
    await this.connectToDb()
  }
}
