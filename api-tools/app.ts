import { express, ResponseData } from "./deps.ts"

class App<Method extends string> {
  private app: ReturnType<typeof express>

  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  start(port: number) {
    return this.app.listen(port)
  }

  on<T>(method: Method, callback: (dto: T) => Promise<any>) {
    console.log(method)

    this.app.post(
      "/" + method,
      async (req, res) => {
        console.log(req.body)
        let respData: ResponseData
        try {
          const result = await callback(await req.body)
          respData = { ok: true, result }
        } catch (err) {
          respData = { ok: false, error: String(err) }
        }
        res.send(respData)
      },
    )
  }
}

export default App
