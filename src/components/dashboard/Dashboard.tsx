import { useState, useEffect, ReactElement } from 'react'
import { User } from "../../types/User"
import { DashboardService } from "../../services/DashboardService"
import { CircularProgress } from "@mui/material"

export function Dashboard() {
  const [user, setUser] = useState<User>()

  async function getUser() {
    const result = await new DashboardService().getDashboardData()
    const { data } = result

    setUser(data.user)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (user == null) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  let avatarStr: ReactElement = <div></div>
  if (user.avatars.large != null) {
    avatarStr = (
      <p>Here is your avatar: <img src={`http://localhost:3007/${user.avatars.medium}`} /></p>
    )
  }

  return (
    <div>
      You are logged in user: { user.username }
      { avatarStr }
    </div>
  )
}