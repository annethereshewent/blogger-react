import { Button, Card, CardActions, CardContent } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
export function AddUserCard() {
  return (
    <Card>
      <CardContent className="plus-icon">
        <AddCircle onClick={addUser} color="primary" />
      </CardContent>
      <CardActions className="card-actions justify-center">
        <Button variant="text" color="secondary" onClick={addUser}>Add Existing User</Button>
      </CardActions>
    </Card>
  )
}

function addUser() {
  return false
}