import { UserAuthenticated, UserProfile } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: UserAuthenticated = {
  authenticated: false,
  userProfile: {
    id: 0,
    username: '',
    sessionActive: false,
    email: '',
    status: false,
    firstName: '',
    middleName: '',
    firstLastname: '',
    secondLastname: '',
    idCard: '',
    birthDate: '',
    roles: [],
    sessions: []
  },
  loading: true
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload
      state.authenticated = true
      state.loading = false
      // return state
    },
    setLoadingProfile(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
      // return state
    }
  }
})

export const { setProfile, setLoadingProfile } = profileSlice.actions
export default profileSlice.reducer