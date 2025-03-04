import { CodesHttpEnum } from "@/enums/codesHttp.enum"
import { UserPasswordUpdateDTO } from "@/models/user.model"
import { updatePassword } from "@/services/auth.service"
import { AxiosError } from "axios"
import { Button } from "primereact/button"
import { Message } from "primereact/message"
import { Password } from "primereact/password"
import { Toast } from "primereact/toast"
import { useRef } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

function UpdatePassword() {
  const toast = useRef<Toast>(null)

  const defaultValues: UserPasswordUpdateDTO = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: ""
  }

  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors, isValid, isDirty }
  } = useForm<UserPasswordUpdateDTO>({ defaultValues })

  const onSubmit: SubmitHandler<UserPasswordUpdateDTO> = async (data) => {
    try {
      if (!isValid) return
      const result = await updatePassword(data)
      if (result.code === CodesHttpEnum.ok) {
        toast.current?.show({ severity: 'success', summary: 'Mensaje', detail: result.message})
        reset()
      }
    } catch (error) { 
      if (error instanceof AxiosError) {
        const { response } = error
        toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.data.message})
      }
    }
  }

  return (
      <>
        <Toast ref={toast}/>
        <form onSubmit={handleSubmit(onSubmit)} className="md:grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="currentPassword">Contrase&ntilde;a actual</label>
              <Controller name="currentPassword" control={control}
                rules={{required: true}}
                render={({field}) => (
                  <Password id={field.name} {...field} feedback={false} toggleMask/>
              )}/>
              {errors.currentPassword?.type === "required" && 
                <Message severity="error" text="Contrase&ntilde;a actual requerida" />
              }
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="newPassword">Contrase&ntilde;a nueva</label>
              <Controller name="newPassword" control={control}
                rules={
                  {
                    required: true, pattern: /^(?=.*[A-Z])(?=.*\W)(?!.*\s).+$/, minLength: 8, maxLength: 100
                  }
                }
                render={({field}) => (
                  <Password id={field.name} {...field} feedback={false} toggleMask/>
              )}/>

              {errors.newPassword?.type === "required" && 
                <Message severity="error" text="Contrase&ntilde;a nueva requerida" />
              }
              {errors.newPassword?.type === "minLength" && 
                <Message severity="error" text="M&iacute;nimo 8 caracteres" />
              }
              {errors.newPassword?.type === "maxLength" && 
                <Message severity="error" text="M&aacute;ximo 100 caracteres" />
              }
              {errors.newPassword?.type === "pattern" && 
                <Message severity="error" text="La contrase&ntilde;a debe contener al menos una letra may&uacute;scula, un signo y no debe contener espacios" />
              }
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="repeatPassword">Repetir contrase&ntilde;a</label>
              <Controller name="repeatPassword" control={control}
                rules={{
                  required: true,
                  validate: {
                    mustMatch: (fieldValue) => {
                      return fieldValue === getValues("newPassword")
                    }
                  }
                }}
                render={({field}) => (
                  <Password id={field.name} {...field} feedback={false} toggleMask/>
              )}/>
              {errors.repeatPassword?.type === "required" && 
                <Message severity="error" text="Repetir contrase&ntilde;a requerido" />
              }
              {errors.repeatPassword?.type === "mustMatch" && 
                <Message severity="error" text="Las contrase&ntilde;as no coinciden" />
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
export default UpdatePassword