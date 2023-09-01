import { Poster } from "./deps.ts"

type Method = keyof Poster
type Dto<T extends Method> = Parameters<Poster[T]>

export type { Dto, Method }
