import { TextField } from "@mui/material";

interface PasswordContainerProps {
  password: string,
  setPassword: (password: string) => void
}

export function PasswordContainer({password, setPassword}: PasswordContainerProps) {
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  return (
    <div className="password-container">
      <TextField
        className="password-field"
        type="password"
        placeholder="password"
        onChange={handlePassword}
      />
    </div>
  )
}