import { BASE_URL } from "@/environment/environment"
import { IHttpResponse } from "@/models/httpResponse.model"
import { ICredentials, IUserToken } from "@/models/user.model"
import axios from "axios"

const authUrl = BASE_URL + '/auth'

export const login = async (credentials: ICredentials) => {
  const { data } = await axios.post<IHttpResponse<IUserToken>>(`${authUrl}/login`, credentials)
  return data
}