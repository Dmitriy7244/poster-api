import { Poster } from "./deps.ts"

type DtoFunctions = Omit<Poster, "postMg" | "connect">
type Method = keyof DtoFunctions
type Dto<T extends Method> = Parameters<Poster[T]>

export type { Dto, Method }
