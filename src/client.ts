import { Method } from "./base.ts"
import { Client, Dayjs, PostScheduleData } from "./deps.ts"
import * as dto from "./dto.ts"

class Poster {
  private client: Client<Method>

  constructor(apiUrl: string) {
    this.client = new Client<Method>(apiUrl)
  }

  private post<Dto extends object>(method: Method, dto: Dto) {
    return this.client.post(method, dto)
  }

  reschedulePostGroup(id: string, date: Dayjs) {
    return this.post<dto.ReschedulePostGroup>("reschedulePostGroup", [
      id,
      date.toString(),
    ])
  }

  schedulePost(data: PostScheduleData, groupId?: string) {
    const newData = { ...data, date: data.date.toString() }
    return this.post<dto.SchedulePost>("schedulePost", [newData, groupId])
  }

  deletePostGroup(id: string) {
    return this.post<dto.DeletePostGroup>("deletePostGroup", [id])
  }
}

export default Poster
export { PostScheduleData }
