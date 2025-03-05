import { IRole, RoleWithPermissions } from "@/models/role.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoleSlice {
  roles: RoleWithPermissions[],
  loading: boolean
}

export const initialState: IRoleSlice = {
  roles: [],
  loading: true
}

export const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<RoleWithPermissions[]>) => {
      state.roles = action.payload
      state.loading = false
    },
    setLoadingRoles: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  }
})

export const { setRoles, setLoadingRoles } = roleSlice.actions
export default roleSlice.reducer