import { UserAuthenticated } from "@/models/user.model"
import { configureStore } from "@reduxjs/toolkit"
import { profileSlice } from "./states/profile"

export interface AppStore {
  profile: UserAuthenticated
}

export default configureStore<AppStore>({
  reducer: {
    profile: profileSlice.reducer
  }
})