import { Dto } from "./base.ts"

export type DeletePostGroup = Dto<"deletePostGroup">

type _ReschedulePostGroup = Dto<"reschedulePostGroup">
export type ReschedulePostGroup = [_ReschedulePostGroup[0], string]

type _SchedulePost = Dto<"schedulePost">
export type SchedulePost = [
  Omit<_SchedulePost[0], "date"> & { date: string },
  _SchedulePost[1],
]

export type GetPostMessageIds = Dto<"getPostMessageIds">
