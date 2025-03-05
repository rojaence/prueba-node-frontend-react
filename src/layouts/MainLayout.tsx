import { UserRolesEnum } from "@/enums/roles.enum";
import { PrivateRoutes } from "@/models/routes";
import { AppStore } from "@/redux/store";
import { Toolbar } from "primereact/toolbar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  const userProfile = useSelector((store: AppStore) => store.profile.userProfile)

  const startContent = userProfile.roles[0].name === UserRolesEnum.Admin ? (
    <div className="flex gap-2">
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Home}`}>Inicio</NavLink>
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Users}`}>Usuarios</NavLink>
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Profile}`}>Perfil</NavLink>
    </div>
  ) : (
    <div className="flex gap-2">
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Home}`}>Inicio</NavLink>
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Profile}`}>Perfil</NavLink>
    </div>
  )

  const endContent = (
      <div className="flex flex-col items-center">
        {/* <span>{`${userProfile.firstName} ${userProfile.firstLastname}`}</span> */}
        <span>{userProfile.username}</span>
      </div>
  );
  return (
    <>
      <Toolbar start={startContent} end={endContent} className="sticky top-0 z-50"/>
      <main className="p-2">
        { children }
      </main>
    </>
  )
}
export default MainLayout
