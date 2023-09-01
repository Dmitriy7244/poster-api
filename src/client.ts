import { Method } from "./base.ts"
import { Client, Dayjs, Poster as _Poster, PostScheduleData } from "./deps.ts"
import * as dto from "./dto.ts"

class Poster {
  private client: Client<Method>

  constructor(apiUrl: string) {
    this.client = new Client<Method>(apiUrl)
  }

  private async post<Dto extends object>(method: Method, dto: Dto) {
    const result = await this.client.post(method, dto)
    return result as any
  }

  reschedulePostGroup: _Poster["reschedulePostGroup"] = (
    id: string,
    date: Dayjs,
  ) => {
    return this.post<dto.ReschedulePostGroup>("reschedulePostGroup", [
      id,
      date.toString(),
    ])
  }

  schedulePost: _Poster["schedulePost"] = (
    data: PostScheduleData,
    groupId?: string,
  ) => {
    const newData = { ...data, date: data.date.toString() }
    return this.post<dto.SchedulePost>("schedulePost", [
      newData,
      groupId,
    ])
  }

  deletePostGroup: _Poster["deletePostGroup"] = (id: string) => {
    return this.post<dto.DeletePostGroup>("deletePostGroup", [id])
  }

  getPostMessageIds: _Poster["getPostMessageIds"] = (
    chatId: number,
    messageId: number,
  ) => {
    return this.post<dto.GetPostMessageIds>("getPostMessageIds", [
      chatId,
      messageId,
    ])
  }
}

export default Poster
export { PostScheduleData }
