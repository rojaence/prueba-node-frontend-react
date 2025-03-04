import MainLayout from "@/layouts/MainLayout"
import { AppStore } from "@/redux/store"
import { Card } from "primereact/card"
import { useSelector } from "react-redux"

function Home() {
  const { authenticated, userProfile } = useSelector((store: AppStore) => store.profile)
  
  return (
    <MainLayout>
      {
        authenticated && (
        <section className="flex flex-col gap-5">
          <Card title="Usuario autenticado">  
            <p><span className="font-bold me-2">Primer nombre:</span> { userProfile.firstName }</p>
            <p><span className="font-bold me-2">Segundo nombre:</span> { userProfile.middleName }</p>
            <p><span className="font-bold me-2">Primer apellido:</span> { userProfile.firstLastname }</p>
            <p><span className="font-bold me-2">Segundo apellido:</span> { userProfile.secondLastname }</p>                
          </Card>
          <Card title="&Uacute;tima sesi&oacute;n">            
            {
              userProfile.sessions.length > 0 && (
                <p><span className="font-bold me-2">Fecha inicio:</span> { userProfile.sessions[0].startDate }</p>            
              )
            }
          </Card>
        </section>
        )
      }
    </MainLayout>
  )
}
export default Home