import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { StudentsModule } from './todo-lists/todo-lists.module'

@Module({
  imports: [ConfigModule.forRoot(), StudentsModule],
})
export class AppModule {}
