import { IRole } from "./role.model"
import { ISession } from "./session.model"

export interface ICredentials {
  username: string,
  password: string
}

export interface IUserToken {
  username: string,
  token: string
}

export interface IUser {
  id: number,
  username: string,
  password: string,
  sessionActive: boolean,
  email: string,
  status: boolean,
  firstName: string,
  middleName: string,
  firstLastname: string,
  secondLastname: string,
  idCard: string,
  birthDate: string,
}

export type IUserSession = Omit<ISession, "idUser">

export type UserProfile = Omit<IUser, "password"> & {
  roles: IRole[],
  sessions: IUserSession[]
}

export type UserProfileUpdateDTO = Omit<IUser, "id" | "password" | "status" | "sessionActive" | "email">
export type UserProfileForm = Omit<IUser, "id" | "password" | "status" | "sessionActive"> & {
  role: string
}

export type UserUpdateDTO = Omit<IUser, "id" | "password" | "sessionActive"> & {
  password?: string,
}

export type UserFormData = Omit<IUser, "id" | "sessionActive"> & {
  password?: string,
  idRole?: number,
}

export type UserPasswordUpdateDTO = {
  currentPassword: string,
  newPassword: string,
  repeatPassword: string
}

export type UserAuthenticated = {
  authenticated: boolean,
  userProfile: UserProfile,
  loading: boolean
}