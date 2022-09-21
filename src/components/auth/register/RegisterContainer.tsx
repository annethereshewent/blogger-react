
import { Check, Close } from '@mui/icons-material'
import {
  Container,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress
} from '@mui/material'
import { useState } from 'react'
import { UserService } from '../../../services/UserService'

interface RegisterContainerProps {
  username: string
  email: string
  gender: string
  setUsername: (username: string) => void
  setEmail: (email: string) => void
  setGender: (gender: string) => void
  setEmailExists: (exists: boolean) => void
  setUsernameExists: (exists: boolean) => void
}


export function RegisterContainer({
  username,
  email,
  setUsername,
  setEmail,
  setGender,
  setEmailExists,
  setUsernameExists
}: RegisterContainerProps) {

  const [usernameLoading, setUsernameLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [usernameIcon, setUsernameIcon] = useState<JSX.Element|null>(null)
  const [emailIcon, setEmailIcon] = useState<JSX.Element|null>(null)

  let timer: NodeJS.Timeout|null = null
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (timer != null) {
      clearTimeout(timer)
    }


    timer = setTimeout(async () => {
      // check if the username exists in database
      setEmailIcon(null)
      if (e.target.value != '') {
        try {
          setEmailLoading(true)

          const result = await new UserService().emailExists(e.target.value)
          const { data } = result

          let icon: JSX.Element|null = null

          icon = data.exists ? <Close className="username-exists" /> : <Check className="username-ok" />
          setEmailIcon(icon)
          setEmailExists(data.exists)
        } catch (e) {
          // @TODO: add error handling
        } finally {
          setEmailLoading(false)
        }
      }

    }, 500)

    setEmail(e.target.value)
  }

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    if (timer != null) {
      clearTimeout(timer)
    }

    timer = setTimeout(async () => {
      // check if the username exists in database
      setUsernameIcon(null)
      if (e.target.value != '') {
        try {
          setUsernameLoading(true)

          const result = await new UserService().userExists(e.target.value)
          const { data } = result

          let icon: JSX.Element|null = null

          icon = data.exists ? <Close className="username-exists" /> : <Check className="username-ok" />
          setUsernameIcon(icon)
          setUsernameExists(data.exists)
        } catch (e) {
          // @TODO: add error handling
        } finally {
          setUsernameLoading(false)
        }
      }

    }, 500)
    setUsername(e.target.value)
  }

  function handleGender(e: React.ChangeEvent<HTMLInputElement>) {
    setGender(e.target.value)
  }

  return (
    <Container className="register-container">
      <Grid item xs={12}>
        <h2 className="title">Create your account</h2>
        <Grid item xs={6}>
          <TextField
            className="text-field"
            style={{ marginBottom: '10px' }}
            label="Username"
            onChange={handleUsername}
            required

          />
          { usernameLoading && <CircularProgress color="primary" /> }
          { usernameIcon }
        </Grid>
        <Grid item xs={6}>
          <TextField
            className="text-field"
            label="E-mail"
            onChange={handleEmail}
            required
          />
          { emailLoading && <CircularProgress color="secondary" /> }
          { emailIcon }
        </Grid>
      </Grid>
      <Grid className="new-row" item xs={12}>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup onChange={handleGender} row >
            <FormControlLabel value="F" control={<Radio required />} label="Female" />
            <FormControlLabel value="M" control={<Radio required />} label="Male" />
            <FormControlLabel value="X" control={<Radio required />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Container>
  )
}