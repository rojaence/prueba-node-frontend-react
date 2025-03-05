import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"

interface Props {
  title?: string,
  visible: boolean,
  children: React.ReactNode,
  onHide?: () => void,
  submitAction?: () => void,
  submitLabel?: string
}

function FormDialog({ title = '', visible, children, onHide = () => {}, submitAction = () => {}, submitLabel = 'Enviar' }: Props) {

  const handleHide = () => {
    onHide()
  }

  const footerContent = (
    <div>
      <Button label="Cancelar" onClick={onHide} severity="secondary"/>
      <Button label={submitLabel} onClick={submitAction} severity="success"/>
    </div>
  )

  return (
    <Dialog header={title} visible={visible} onHide={handleHide} footer={footerContent} className="w-full md:w-4xl m-2">
      { children }
    </Dialog>
  )
}
export default FormDialog