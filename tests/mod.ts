import { dayjs } from "https://raw.githubusercontent.com/Dmitriy7244/poster/master/src/deps.ts"
import Poster, { PostScheduleData } from "../src/client.ts"

const poster = new Poster("http://localhost:3232")

const channelIds = [-1001984549268, -1001585027208]
const messageId = 7445
const date = dayjs().add(100, "minutes")
const data = new PostScheduleData(channelIds, messageId, date)

// const r = await poster.schedulePost(data)

// await poster.reschedulePostGroup("64f146d8325ce330818ef15d", date)

const r = await poster.getPostMessageIds(channelIds[1], 1296)
console.log(r)
