import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { todoListsController } from './todo-lists.controller'
import { todoListsService } from './todo-lists.service'

@Module({
  imports: [DatabaseModule],
  controllers: [todoListsController],
  providers: [todoListsService],
})
export class StudentsModule {}
