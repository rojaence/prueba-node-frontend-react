import { BASE_URL } from "@/environment/environment"
import { IHttpResponse } from "@/models/httpResponse.model"
import { ICredentials, IUserToken, UserPasswordUpdateDTO, UserProfile, UserProfileUpdateDTO } from "@/models/user.model"
import axios from "axios"

const authUrl = BASE_URL + '/auth'

axios.defaults.withCredentials = true;

export const login = async (credentials: ICredentials) => {
  const { data } = await axios.post<IHttpResponse<IUserToken>>(`${authUrl}/login`, credentials)
  return data
}

export const getProfile = async () => {
  const { data } = await axios.get<IHttpResponse<UserProfile>>(`${authUrl}/profile`)
  return data
}

export const updateProfile = async (newUserProfile: UserProfileUpdateDTO) => {
  console.log(newUserProfile)
  const { data } = await axios.put<IHttpResponse<UserProfile>>(`${authUrl}/profile`, newUserProfile)
  return data
}

export const updatePassword = async (newPasswordData: UserPasswordUpdateDTO) => {
  const { data } = await axios.post<IHttpResponse<{ sucess: boolean }>>(`${authUrl}/update-password`, newPasswordData)
  return data
}