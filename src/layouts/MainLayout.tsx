import { PrivateRoutes } from "@/models/routes";
import { Toolbar } from "primereact/toolbar";
import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {

  const startContent = (
    <div className="flex gap-2">
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Home}`}>Inicio</NavLink>
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Users}`}>Usuarios</NavLink>
      <NavLink className="py-1 px-4 bg-gray-600/50 rounded-2xl" to={`/${PrivateRoutes.Dashboard}/${PrivateRoutes.Profile}`}>Perfil</NavLink>
    </div>
  );

  const endContent = (
      <>
          username
      </>
  );
  return (
    <>
      <Toolbar start={startContent} end={endContent}/>
      <main className="p-2">
        { children }
      </main>
    </>
  )
}
export default MainLayout
