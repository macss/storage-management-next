import React, { useState } from 'react'
import Head from 'next/head'
import { Copyright, RecoverPasswordDialog } from '@components'
import { auth } from '@config/firebaseConfig'
import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence, browserSessionPersistence } from '@firebase/auth'
import { 
  Avatar, 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  FormControlLabel, 
  Grid, 
  Link, 
  TextField, 
  Typography 
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { useRouter } from 'next/dist/client/router'

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState({
    active: false,
    message: ''
  })

  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleDialog = () => setDialogOpen(v => !v)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const { email, password, remember } = {
      email: form.get('email') as string,
      password: form.get('password') as string,
      remember: form.get('remember')
    }

    const persistence = remember ? browserLocalPersistence : browserSessionPersistence

    setError(v=>({...v, active: false}))
    setPersistence(auth, persistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
    }).then(_ => {
      router.push('/')
    }).catch(e => {
      setError({
        active: true,
        message: e.message
      })
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>
          Entrar - Storage Management
        </title>
        <meta name="description" content="Login form" />
      </Head>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            error={error.active}
            helperText={error && error.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox 
                value="remember" 
                color="primary" 
                name="remember"
              />
            }
            label="Mantenha-me conectado"            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' onClick={toggleDialog} variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <RecoverPasswordDialog open={dialogOpen} onClose={toggleDialog}/>
    </Container>
  )
}

Login.displayName = 'Login Page'
Login.getLayout = (page: React.ReactElement) => page

export default Login
