import { auth } from '@config/firebaseConfig'
import { sendPasswordResetEmail } from '@firebase/auth'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React from 'react'

interface RecoverPasswordDialogProps {
  open: boolean,
  onClose: () => void
}

const RecoverPasswordDialog = ({ open, onClose }: RecoverPasswordDialogProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string

    sendPasswordResetEmail(auth, email)
    onClose()
  }

  return (
    <Dialog {...{open, onClose}}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Recuperar senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para recuperar a sua senha digite o seu e-mail no campo abaixo. 
            Enviaremos um e-mail com as informações necessárias para trocar a sua senha.
          </DialogContentText>
          <TextField 
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Endereço de e-mail"
            type="email"
            fullWidth
            required
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Recuperar senha</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

RecoverPasswordDialog.displayName = 'Recover Password Form'

export default RecoverPasswordDialog
