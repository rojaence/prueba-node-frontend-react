import { PrivateRoutes } from "@/models/routes"
import RoutesWithNotFound from "@/utils/routesWithNotFound"
import Users from "../users/Users"
import Profile from "../profile/Profile"
import { Navigate, Route } from "react-router-dom"
import Home from "../home/Home"
import { useEffect } from "react"
import { CodesHttpEnum } from "@/enums/codesHttp.enum"
import { setProfile } from "@/redux/states/profile"
import { getProfile } from "@/services/auth.service"
import { AxiosError } from "axios"
import { useDispatch } from "react-redux"

function Dashboard() {
  const dispatch = useDispatch() 

  const fetchProfile = async () => {
    try {
      const response = await getProfile()
      if (response.code === CodesHttpEnum.ok) {
        dispatch(setProfile(response.data))
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.Home}/>}/>
        <Route path={PrivateRoutes.Home} element={<Home />}/>
        <Route path={PrivateRoutes.Users} element={<Users />}/>
        <Route path={PrivateRoutes.Profile} element={<Profile />}/>
      </RoutesWithNotFound>
    </>  
  )
}
export default Dashboard