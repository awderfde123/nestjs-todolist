import * as joi from 'joi'
import {
  RequiredBooleanSchema,
  RequiredDateSchema,
  RequiredStringSchema,
} from '../../schema/base.schema'

export const CreateTodoListSchema = () =>
  joi.object().keys({
    date: RequiredDateSchema(),
    detail: RequiredStringSchema(),
    finish: RequiredBooleanSchema(),
  })

export const ModifyTodoListSchema = () =>
  joi.object().keys({
    _id: RequiredStringSchema(),
    date: RequiredDateSchema(),
    detail: RequiredStringSchema(),
    finish: RequiredBooleanSchema(),
  })
