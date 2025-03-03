import { ICredentials } from "@/models/user.model"
import { login } from "@/services/auth.service"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message"
import { SubmitHandler, useForm } from "react-hook-form"
import { Toast } from 'primereact/toast';
import { useRef } from "react"
import { CodesHttpEnum } from "@/enums/codesHttp.enum"
import { AxiosError } from "axios"

function Login() {
  const toast = useRef<Toast>(null)

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ICredentials>()
  
  const onSubmit: SubmitHandler<ICredentials> = async (data) => {
    try {
      const result = await login(data)
      if (result.code === CodesHttpEnum.ok) {
        toast.current?.show({ severity: 'success', summary: 'Mensaje', detail: result.message})
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error
        toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.data.message})
        
      }
    }
  }

  
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Toast ref={toast}/>
      <Card title="Iniciar sesi&oacute;n" className="p-5">
        <form action="#" className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username">Email</label>
            <InputText id="username" placeholder="Username" className="mr-2" {...register("username", { required: true })}/>
            {errors.username?.type === "required" && 
              <Message severity="error" text="Nombre de usuario requerido" />
            }
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password">Contrase&ntilde;a</label>
            <InputText id="password" placeholder="Username" className="mr-2" {...register("password", { required: true})}/>
            {errors.password?.type === "required" && 
              <Message severity="error" text="Contrase&ntilde;a requerida" />
            }
          </div>
          
          <Button label='Iniciar'/>
        </form>
      </Card>
    </section>
  )
}
export default Login