import dayjs from "npm:dayjs"
import { Method } from "./base.ts"
import { App, createPosterFromEnv } from "./deps.ts"
import * as dto from "./dto.ts"

const poster = await createPosterFromEnv()
const app = new App<Method>()

app.on(
  "schedulePost",
  ([rawData, groupId]: dto.SchedulePost) => {
    const data = { ...rawData, date: dayjs(rawData.date) }
    return poster.schedulePost(data, groupId)
  },
)

app.on(
  "reschedulePostGroup",
  ([id, date]: dto.ReschedulePostGroup) => {
    return poster.reschedulePostGroup(id, dayjs(date))
  },
)

app.on(
  "deletePostGroup",
  (dto: dto.DeletePostGroup) => poster.deletePostGroup(...dto),
)

app.start(3232)
