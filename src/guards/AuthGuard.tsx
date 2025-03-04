import AppLoader from "@/layouts/AppLoader"
import { PublicRoutes } from "@/models/routes"
import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const NextNavigate = <Outlet />
const LoginNavigate = <Navigate replace to={`/${PublicRoutes.Login}`}/>

function AuthGuard() {
  const { authenticated, loading } = useSelector((store: AppStore) => store.profile)

  if (loading) return <AppLoader />
  
  return authenticated ? 
    NextNavigate
  : 
    LoginNavigate
}
export default AuthGuard