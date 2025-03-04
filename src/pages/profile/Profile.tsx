import MainLayout from "@/layouts/MainLayout";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import { Divider } from "primereact/divider";

function Profile() {
  return (
    <MainLayout>
      <section className="max-w-4xl mx-auto">
        <h2 className="mb-4">Datos de perfil</h2>
        <UpdateProfile />
      </section>
      <Divider />
      <section className="max-w-4xl mx-auto">
        <h2 className="mb-4">Actualizar contrase&ntilde;a</h2>
        <UpdatePassword />
      </section>
    </MainLayout>
  )
}
export default Profile