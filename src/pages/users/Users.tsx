import MainLayout from "@/layouts/MainLayout"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { UserProfile } from "@/models/user.model";
import { Button } from "primereact/button";
import { AxiosError } from "axios";
import { getUsers } from "@/services/users.service";
import { CodesHttpEnum } from "@/enums/codesHttp.enum";
import { useFormDialog } from "@/components/FormDialog/useFormDialog";
import FormDialog from "@/components/FormDialog/FormDialog";
import CreateUser from "./components/CreateUser";
        
function Users() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  const createUserDialog = useFormDialog()

  const statusBodyTemplate = (user: UserProfile) => {
    return <span>{user.status ? 'Activo' : 'Inactivo'}</span>
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await getUsers()      
      if (response.code === CodesHttpEnum.ok) {
        setUsers(response.data!)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const actionsBodyTemplate = (user: UserProfile) => {
    return (
      <>
        <div>
          <Button label="Editar" onClick={() => console.log(user)}/>
        </div>
      </>
    )
  }

  const fullnameBodyTemplate = (user: UserProfile) => {
    return <span>{`${user.firstName} ${user.firstLastname} ${user.secondLastname}`}</span>
  }

  const header = () => {
    return (
      <div className="flex justify-end">
        <Button label="Nuevo usuario" severity="info" onClick={createUserDialog.openDialog}/>
      </div>
    )
  }

  return (
    <MainLayout>
      <section className="container mx-auto">
        <DataTable value={users} tableStyle={{ minWidth: '50rem' }} loading={loading} header={header}>
          <Column field="username" header="Nombre de usuario"/>
          <Column header="Nombre completo" body={fullnameBodyTemplate}/>
          <Column field="email" header="Email"/>
          <Column field="status" header="Estado" body={statusBodyTemplate}/>
          <Column header="Opciones" body={actionsBodyTemplate}/>
        </DataTable>    
      </section>

      <FormDialog title="Nuevo usuario" visible={createUserDialog.visible} onHide={createUserDialog.closeDialog}>
        <CreateUser />
      </FormDialog>
    </MainLayout>
  )
}
export default Users