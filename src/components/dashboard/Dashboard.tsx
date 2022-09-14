import { useState, useEffect, ReactElement } from 'react'
import { User } from "../../types/User"
import { DashboardService } from "../../services/DashboardService"
import { CircularProgress } from "@mui/material"
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  async function getUser() {
    try {
      const result = await new DashboardService().getDashboardData()
      const { data } = result

      setUser(data.user)
    } catch (e: any) {
      // navigate back to the dashboard if status is 401
      if (e.response.status == 401) {
        localStorage.removeItem('apiToken')
        navigate('/')
      }
    }
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