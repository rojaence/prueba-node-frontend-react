import { UserFormData } from "@/models/user.model"
import { AppStore } from "@/redux/store"
import { DateTime } from "luxon"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"

function CreateUser() {
  const roleState = useSelector((store: AppStore) => store.roles)

  const defaultValues: UserFormData = {
    birthDate: DateTime.now().toString(),
    email: '',
    firstLastname: '',
    firstName: '',
    idCard: '',
    idRole: undefined,
    middleName: '',
    password: '',
    secondLastname: '',
    status: true,
    username: ''
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm<UserFormData>({ defaultValues })

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    console.log(data)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="md:grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex flex-col gap-2 mb-2">
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
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="firstName">Primer nombre</label>
            <InputText id="firstName" className="mr-2" {...register("firstName", { required: true })}/>
            {errors.firstName?.type === "required" && 
              <Message severity="error" text="Primer nombre requerido" />
            }
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="middleName">Segundo nombre</label>
            <InputText id="middleName" className="mr-2" {...register("middleName", { required: true })}/>
            {errors.middleName?.type === "required" && 
              <Message severity="error" text="Segundo nombre requerido" />
            }
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="firstLastname">Primer apellido</label>
            <InputText id="firstLastname" className="mr-2" {...register("firstLastname", { required: true })}/>
            {errors.firstLastname?.type === "required" && 
              <Message severity="error" text="Primer apellido requerido" />
            }
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="secondLastname">Segundo apellido</label>
            <InputText id="secondLastname" className="mr-2" {...register("secondLastname", { required: true })}/>
            {errors.secondLastname?.type === "required" && 
              <Message severity="error" text="Segundo apellido requerido" />
            }
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email">Email</label>
            <InputText id="email" className="mr-2" {...register("email", { required: true, disabled: true })} />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="">Rol</label>
            <Controller name="idRole" rules={{ required: true }} control={control} render={({ field }) => (
                <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={roleState.roles} optionLabel="name" optionValue="id" placeholder="Seleccione un rol"/>
            )} />
            {errors.idCard?.type === "required" && 
              <Message severity="error" text="Rol requerido" />
            }
          </div>

          <div className="flex flex-col gap-2 mb-2">
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
          <div className="flex flex-col gap-2 mb-2">
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
        <div>
        
      </div>
      </form>
    </>
  )
}
export default CreateUser