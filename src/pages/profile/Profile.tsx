import MainLayout from "@/layouts/MainLayout";
import UpdateProfile from "./components/UpdateProfile";

function Profile() {
  return (
    <MainLayout>
      <div>Profile</div>
      <section className="max-w-4xl mx-auto">
        <UpdateProfile />
      </section>
    </MainLayout>
  )
}
export default Profile