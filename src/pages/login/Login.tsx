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
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setProfile } from "@/redux/states/profile"
import { PrivateRoutes } from "@/models/routes"

function Login() {
  const toast = useRef<Toast>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        dispatch(setProfile(result.data))
        navigate(`/${PrivateRoutes.Dashboard}`, { replace: true })
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
            <label htmlFor="username">Nombre de usuario</label>
            <InputText id="username" className="mr-2" {...register("username", { required: true })}/>
            {errors.username?.type === "required" && 
              <Message severity="error" text="Nombre de usuario requerido" />
            }
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password">Contrase&ntilde;a</label>
            <InputText id="password" className="mr-2" {...register("password", { required: true })} type="password"/>
            {/* <Password id="password" className="mr-2" {...register("password", { required: true})} toggleMask feedback={false}/> */}
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