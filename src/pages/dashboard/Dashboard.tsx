import { CodesHttpEnum } from "@/enums/codesHttp.enum"
import { PrivateRoutes } from "@/models/routes"
import { setLoadingProfile, setProfile } from "@/redux/states/profile"
import { getProfile } from "@/services/auth.service"
import RoutesWithNotFound from "@/utils/routesWithNotFound"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Navigate, Route } from "react-router-dom"
import Home from "../home/Home"
import Profile from "../profile/Profile"
import Users from "../users/Users"
import AuthGuard from "@/guards/AuthGuard"
import { setLoadingRoles, setRoles } from "@/redux/states/roles"
import { getRoles } from "@/services/role.service"

function Dashboard() {
  const dispatch = useDispatch() 

  const fetchProfile = async () => {
    dispatch(setLoadingProfile(true))
    try {
      const response = await getProfile()
      if (response.code === CodesHttpEnum.ok) {
        dispatch(setProfile(response.data!))
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
      }
    } finally {
      dispatch(setLoadingProfile(false))
    }
  }

  const fetchRoles = async () => {
    dispatch(setLoadingRoles(true))
    try {
      const response = await getRoles()
      if (response.code === CodesHttpEnum.ok) {
        console.log(response.data)
        dispatch(setRoles(response.data!))
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
      }
    } finally {
      dispatch(setLoadingRoles(false))
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchRoles()
  }, [])

  return (
    <>
      <RoutesWithNotFound>  
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Navigate to={PrivateRoutes.Home}/>}/>
          <Route path={PrivateRoutes.Home} element={<Home />}/>
          <Route path={PrivateRoutes.Users} element={<Users />}/>
          <Route path={PrivateRoutes.Profile} element={<Profile />}/>
        </Route>
      </RoutesWithNotFound>
    </>  
  )
}
export default Dashboard