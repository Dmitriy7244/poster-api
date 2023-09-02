import { createPosterFromEnv, PostScheduleData } from "../src/client.ts"
import { dayjs } from "../src/deps.ts"

const poster = createPosterFromEnv()

const channelIds = [-1001984549268, -1001585027208]
const messageId = 7481
const date = dayjs().add(100, "minutes")
const data = new PostScheduleData(channelIds, messageId, date)
const groupId = "64f2ad8dcf72a3998cb0db27"

// const r = await poster.schedulePost(data, groupId)
// await poster.reschedulePostGroup("64f146d8325ce330818ef15d", date)
const r = await poster.getPostMessageIds(channelIds[1], 1296)
console.log(r)

// await poster.deletePostGroup(groupId)
