import { useState, useEffect, ReactElement } from 'react'
import { User } from "../../types/User"
import { DashboardService } from "../../services/DashboardService"
import { CircularProgress } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { ConfirmationModal } from './ConfirmationModal'

const CODE_NOT_CONFIRMED = 100

export function Dashboard() {
  const [user, setUser] = useState<User>()
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

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
      console.log(e.response?.data?.code)
      if (e.response?.status == 400 && e.response?.data?.code == CODE_NOT_CONFIRMED) {
        setUser(e.response?.data?.user)
        setOpenConfirmation(true)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (loading || user == null) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  let avatarStr = <div></div>
  if (user.avatars.medium != null) {
    avatarStr = (
      <p>Here is your avatar: <img src={`http://localhost:3007/${user.avatars.medium}`} /></p>
    )
  }

  return (
    <div>
      You are logged in user: { user.username }
      { avatarStr }
      <ConfirmationModal
        user={user}
        openConfirmation={openConfirmation}
        setOpenConfirmation={setOpenConfirmation}
      />
    </div>
  )
}