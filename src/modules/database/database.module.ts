import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonQueryService } from './common-query.service'
import { DbClientService } from './db-client.service'

@Module({
  imports: [ConfigModule],
  providers: [DbClientService, CommonQueryService],
  exports: [DbClientService, CommonQueryService],
})
export class DatabaseModule {}
