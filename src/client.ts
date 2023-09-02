import { Method } from "./base.ts"
import {
  Client,
  Dayjs,
  env,
  log,
  Poster as _Poster,
  PostScheduleData,
} from "./deps.ts"

class Poster {
  private client: Client<Method>

  constructor(apiUrl: string) {
    this.client = new Client<Method>(apiUrl)
  }

  private async post<Dto extends object>(method: Method, dto: Dto) {
    log("post", { method, dto })
    const result = await this.client.post(method, dto)
    return result as any
  }

  private rpc<M extends Method>(
    name: M,
    s: (...args: Parameters<_Poster[M]>) => any[] = (...args) => args,
  ) {
    return (...args: Parameters<_Poster[M]>) => {
      return this.post(name, s(...args)) as ReturnType<_Poster[M]>
    }
  }

  deletePostGroup = this.rpc("deletePostGroup")

  reschedulePostGroup = this.rpc(
    "reschedulePostGroup",
    (id: string, date: Dayjs) => [id, date.toString()],
  )

  schedulePost = this.rpc(
    "schedulePost",
    (
      data: PostScheduleData,
      groupId?: string,
    ) => [{ ...data, date: data.date.toString() }, groupId],
  )

  getPostMessageIds = this.rpc("getPostMessageIds")
}

function createPosterFromEnv(keys: { apiUrl?: string } = {}) {
  return new Poster(env.str(keys.apiUrl ?? "POSTER_URL"))
}

export default Poster
export { createPosterFromEnv, PostScheduleData }
