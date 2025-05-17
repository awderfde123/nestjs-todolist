import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { isNullOrUndefined } from '../../helpers/util.helper'
import { IdParam } from '../../models/dto/id-param'
import { PagingQuery } from '../../models/dto/pagination'
import { todoLists } from '../../models/entities/todo-lists'
import { JoiPipe } from '../../pipes/joi.pipe'
import { IdSchema, PagingSchema } from '../../schema/base.schema'
import { CreateTodoListSchema, ModifyTodoListSchema } from './todo-lists.schema'
import { todoListsService } from './todo-lists.service'

@Controller('todoLists')
export class todoListsController {
  constructor(private todoListsService: todoListsService) {}

  @Get()
  async listTodoList(
    @Req() req: Request,
    @Query(new JoiPipe(PagingSchema())) query: PagingQuery,
  ) {
    const result = await this.todoListsService.listTodoList(req.url, query)
    return result
  }

  @Get(':id')
  async detailTodoList(@Param(new JoiPipe(IdSchema())) param: IdParam) {
    const todoList = await this.todoListsService.detailTodoList(param.id)
    if (isNullOrUndefined(todoList)) {
      throw new NotFoundException('List not found')
    }
    return { data: todoList }
  }

  @Post()
  async createTodoList(
    @Body(new JoiPipe(CreateTodoListSchema())) body: todoLists,
  ) {
    await this.todoListsService.createTodoList(body)
  }

  @Put()
  async modifyTodoList(
    @Body(new JoiPipe(ModifyTodoListSchema())) body: todoLists,
  ) {
    const matchedCount = await this.todoListsService.modifyTodoList(body)
    if (matchedCount === 0) {
      throw new NotFoundException('List not found')
    }
  }

  @Delete(':id')
  async removeTodoList(@Param(new JoiPipe(IdSchema())) param: IdParam) {
    const deletedCount = await this.todoListsService.removeTodoList(param.id)
    if (deletedCount === 0) {
      throw new NotFoundException('List not found')
    }
  }
}
