import { useState } from 'react';

export function useFormDialog(initialState: boolean = false) {
  const [visible, setVisible] = useState(initialState);

  const openDialog = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  return {
    visible,
    openDialog,
    closeDialog
  };
}
