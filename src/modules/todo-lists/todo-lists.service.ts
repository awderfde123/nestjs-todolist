import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { PagingQuery } from '../../models/dto/pagination'
import { DocName } from '../../models/entities/shared/doc-name'
import { todoLists } from '../../models/entities/todo-lists'
import { CommonQueryService } from '../database/common-query.service'

@Injectable()
export class todoListsService {
  constructor(private commonQueryService: CommonQueryService) {}

  async listTodoList(url: string, paging: PagingQuery) {
    const conditions = {}
    const TodoList = await this.commonQueryService.findWithPaging<todoLists>(
      DocName.todoLists,
      conditions,
      url,
      paging,
    )
    return TodoList
  }

  async detailTodoList(_id: ObjectId) {
    const conditions = {
      _id,
    }
    const TodoList = await this.commonQueryService.findOneById<todoLists>(
      DocName.todoLists,
      conditions,
    )
    return TodoList
  }

  async createTodoList(todoList: todoLists) {
    const now = new Date()
    const { insertedId } = await this.commonQueryService.insertOne(
      now,
      DocName.todoLists,
      todoList,
    )
    return insertedId
  }

  async modifyTodoList(TodoList: todoLists) {
    const now = new Date()
    const conditions = {
      _id: TodoList._id,
    }
    const update = {
      $set: TodoList,
    }
    const { matchedCount } = await this.commonQueryService.updateOneById(
      now,
      DocName.todoLists,
      conditions,
      update,
    )
    return matchedCount
  }

  async removeTodoList(_id: ObjectId) {
    const conditions = {
      _id,
    }
    const { deletedCount } = await this.commonQueryService.deleteOneById(
      DocName.todoLists,
      conditions,
    )
    return deletedCount
  }
}
