import { MenuItem, Menu, Paper, ClickAwayListener } from "@mui/material"
import { RefObject } from "react"
import { useNavigate } from "react-router-dom"

interface AccountMenuProps {
  anchorRef: RefObject<HTMLDivElement>
  open: boolean
  setOpen: (open: boolean) => void
}


export function AccountMenu({anchorRef, open, setOpen}: AccountMenuProps) {

  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('apiToken')
    navigate('/')
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    anchorRef.current && <Paper className="account-menu">
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem>Manage accounts</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Paper>
  )
}