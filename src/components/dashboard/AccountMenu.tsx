import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material"

export function AccountMenu() {
  const open = true

  return (
    <Paper className="account-menu">
      <Menu
        open={open}
      >
        <MenuItem>Manage accounts</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </Paper>
  )
}