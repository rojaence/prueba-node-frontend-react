import { UserAuthenticated } from "@/models/user.model";
import { createSlice } from "@reduxjs/toolkit";

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
  }
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.userProfile = action.payload
      state.authenticated = true
      console.log(state)
      return state
    }
  }
})

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer