import { BASE_URL } from "@/environment/environment";
import { IHttpResponse } from "@/models/httpResponse.model";
import { UserProfile } from "@/models/user.model";
import axios from "axios"

const usersUrl = BASE_URL + "/users"

axios.defaults.withCredentials = true

export const getUsers = async () => {
  const { data } = await axios.get<IHttpResponse<UserProfile[]>>(usersUrl)
  return data
}