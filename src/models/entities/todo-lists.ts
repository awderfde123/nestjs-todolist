import { ObjectId } from 'mongodb'

export class todoLists {
  _id: ObjectId
  date: Date
  detail: string
  finish: boolean
}
