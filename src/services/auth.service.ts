import { BASE_URL } from "@/environment/environment"
import { IHttpResponse } from "@/models/httpResponse.model"
import { ICredentials, IUserToken, UserProfile } from "@/models/user.model"
import axios from "axios"

const authUrl = BASE_URL + '/auth'

axios.defaults.withCredentials = true;

export const login = async (credentials: ICredentials) => {
  const { data } = await axios.post<IHttpResponse<IUserToken>>(`${authUrl}/login`, credentials)

  return data
}

export const getProfile = async () => {
  const { data } = await axios.get<IHttpResponse<UserProfile>>(`${authUrl}/profile`, { withCredentials: true })
  return data
}