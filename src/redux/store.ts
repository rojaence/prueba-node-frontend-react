import { UserAuthenticated } from "@/models/user.model"
import { configureStore } from "@reduxjs/toolkit"
import { profileSlice } from "./states/profile"
import { IRoleSlice, roleSlice } from "./states/roles"

export interface AppStore {
  profile: UserAuthenticated,
  roles: IRoleSlice
}

export default configureStore<AppStore>({
  reducer: {
    profile: profileSlice.reducer,
    roles: roleSlice.reducer
  }
})