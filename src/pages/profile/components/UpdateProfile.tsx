import { UserUpdateDTO } from "@/models/user.model"
import { AppStore } from "@/redux/store"
import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message"
import { Toast } from "primereact/toast"
import { useEffect, useRef } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { DateTime } from "luxon"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "@/services/auth.service"
import { AxiosError } from "axios"
import { CodesHttpEnum } from "@/enums/codesHttp.enum"
import { setProfile } from "@/redux/states/profile"

function UpdateProfile() {
  const toast = useRef<Toast>(null)
  const dispatch = useDispatch()
  const userProfile = useSelector((store: AppStore) => store.profile.userProfile)
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isValid }
  } = useForm<UserUpdateDTO>()

  const onSubmit: SubmitHandler<UserUpdateDTO> = async (data) => {

    try {
      if (!isValid) return
      const result = await updateProfile(data)
      if (result.code === CodesHttpEnum.ok) {
        toast.current?.show({ severity: 'success', summary: 'Mensaje', detail: result.message})
        dispatch(setProfile(result.data!))
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error
        toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.data.message})
      }
    }
  }

  useEffect(() => {
    const resetData: UserUpdateDTO = {
      username: userProfile.username,
      email: userProfile.email,
      firstName: userProfile.firstName,
      middleName: userProfile.middleName,
      firstLastname: userProfile.firstLastname,
      secondLastname: userProfile.secondLastname,
      idCard: userProfile.idCard,
      birthDate: userProfile.birthDate,
      role: userProfile.roles[0].name,
      status: userProfile.status
    }

    reset(resetData)
  }, [userProfile, reset])

  return (
   <>
    <Toast ref={toast}/>
    <form onSubmit={handleSubmit(onSubmit)} className="md:grid md:grid-cols-2 gap-4">
      <div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="username">Nombre de usuario</label>
          <InputText id="username" className="mr-2" {...register("username", { required: true, minLength: 8, maxLength: 20, pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/})}/>
          {errors.username?.type === "required" && 
            <Message severity="error" text="Nombre de usuario requerido" />
          }
          {errors.username?.type === "minLength" && 
            <Message severity="error" text="M&iacute;nimo 8 caracteres" />
          }
          {errors.username?.type === "maxLength" && 
            <Message severity="error" text="M&aacute;ximo 20 caracteres" />
          }
          {errors.username?.type === "pattern" && 
            <Message severity="error" text="El nombre de usuario debe contener al menos una letra mayúscula y un número, y no puede contener signos" />
          }
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="firstName">Primer nombre</label>
          <InputText id="firstName" className="mr-2" {...register("firstName", { required: true })}/>
          {errors.firstName?.type === "required" && 
            <Message severity="error" text="Primer nombre requerido" />
          }
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="middleName">Segundo nombre</label>
          <InputText id="middleName" className="mr-2" {...register("middleName", { required: true })}/>
          {errors.middleName?.type === "required" && 
            <Message severity="error" text="Segundo nombre requerido" />
          }
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="firstLastname">Primer apellido</label>
          <InputText id="firstLastname" className="mr-2" {...register("firstLastname", { required: true })}/>
          {errors.firstLastname?.type === "required" && 
            <Message severity="error" text="Primer apellido requerido" />
          }
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="secondLastname">Segundo apellido</label>
          <InputText id="secondLastname" className="mr-2" {...register("secondLastname", { required: true })}/>
          {errors.secondLastname?.type === "required" && 
            <Message severity="error" text="Segundo apellido requerido" />
          }
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email</label>
          <InputText id="email" className="mr-2" {...register("email", { required: true, disabled: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="role">Rol</label>
          <InputText id="role" className="mr-2" {...register("role", { required: true, disabled: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="idCard">C&eacute;dula</label>
          <InputText id="idCard" className="mr-2" {...register("idCard", { required: true, minLength: 10, maxLength: 10, pattern: /^(?!.*(\d)\1{3})\d{10}$/ })}/>
          {errors.idCard?.type === "required" && 
            <Message severity="error" text="C&eacute;dula requerida" />
          }
          {errors.idCard?.type === "minLength" && 
            <Message severity="error" text="Debe tener 10 n&uacute;meros" />
          }
          {errors.idCard?.type === "maxLength" && 
            <Message severity="error" text="Debe tener 10 n&uacute;meros" />
          }
          {errors.idCard?.type === "pattern" && 
            <Message severity="error" text="Debe tener solo números y no puede tener 4 veces seguidas el mismo." />
          }
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="birthDate">Fecha nacimiento</label>
          <Controller name="birthDate" control={control}
            rules={{required: true}}
            render={({field}) => (
            <Calendar id={field.name} value={DateTime.fromISO(field.value).toJSDate()} className="mr-2" onChange={(e) => e.value && field.onChange((e.value as Date).toISOString())} dateFormat="dd/mm/yy" />
          )}/>
          
          {errors.birthDate?.type === "required" && 
            <Message severity="error" text="Fecha nacimiento requerida" />
          }
        </div>
      </div>

      <div className="col-span-full justify-self-end flex gap-2">
        <Button label='Cancelar' type="button" severity="secondary" text onClick={() => reset()}/>
        <Button label='Actualizar'/>
      </div>
    </form>
   </> 
  )
}
export default UpdateProfile