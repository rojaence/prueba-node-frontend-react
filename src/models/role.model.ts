export interface IRole {
  id: number,
  name: string
}

export type RoleWithPermissions = IRole & {
  permissions: { name: string }[]
}