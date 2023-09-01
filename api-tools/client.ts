import { error, ResponseData } from "./deps.ts"

class Client<Method extends string> {
  constructor(private apiUrl: string) {}

  async post<Dto extends object, R>(method: Method, dto: Dto) {
    const url = this.apiUrl + "/" + method
    // const resp = await axios.post(url, dto)
    // const data = await resp.data as ResponseData
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    })
    // console.log(await resp.text())
    const data = await resp.json() as ResponseData
    if (!data.ok) error(data.error!)
    return data.result as R
  }
}

export default Client
