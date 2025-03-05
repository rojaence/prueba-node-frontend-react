import { BASE_URL } from "@/environment/environment"
import { IHttpResponse } from "@/models/httpResponse.model"
import { IRole } from "@/models/role.model"

import axios from "axios"

const roleUrl = BASE_URL + '/roles'

axios.defaults.withCredentials = true

export const getRoles = async () => {
  const { data } = await axios.get<IHttpResponse<IRole[]>>(roleUrl)
  return data
}