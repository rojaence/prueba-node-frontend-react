import { CodesHttpEnum } from "@/enums/codesHttp.enum";

export interface IHttpResponse<T> {
  code: CodesHttpEnum,
  data?: T,
  message: string
}

