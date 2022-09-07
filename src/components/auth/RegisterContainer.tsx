
import {
  Container,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material'

interface RegisterContainerProps {
  username: string,
  email: string,
  setUsername: (username: string) => void,
  setEmail: (email: string) => void
}


export function RegisterContainer({username, email, setUsername, setEmail}: RegisterContainerProps) {
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }

  return (
    <Container className="register-container">
      <Grid item xs={12}>
        <h2 className="title">Create your account</h2>
        <Grid item xs={6}>
          <TextField
            className="text-field"
            label="Username"
            onChange={handleUsername}
            value={username} />

        </Grid>
        <Grid item xs={6}>
          <TextField
            className="text-field"
            label="E-mail"
            onChange={handleEmail}
            value={email}
          />
        </Grid>
      </Grid>
      <Grid className="new-row" item xs={12}>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Container>
  )
}