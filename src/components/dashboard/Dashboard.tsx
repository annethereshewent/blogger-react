import { useState, useEffect } from 'react'
import { User } from "../../types/User"
import { DashboardService } from "../../services/DashboardService"
import { CircularProgress } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { ConfirmationModal } from './ConfirmationModal'
import { AvatarModal } from './AvatarModal'
import '../../styles/dashboard.scss'

const CODE_NOT_CONFIRMED = 100
const BASE_URL = process.env.REACT_APP_BASE_URL

export function Dashboard() {
  const [user, setUser] = useState<User>()
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openAvatar, setOpenAvatar] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const dashboardService = new DashboardService()

  async function getUser() {
    try {
      const result = await dashboardService.getDashboardData()
      const { data } = result

      setUser(data.user)
    } catch (e: any) {
      // navigate back to the dashboard if status is 401
      if (e.response.status == 401) {
        localStorage.removeItem('apiToken')
        navigate('/')
      }
      if (e.response?.status == 400 && e.response?.data?.code == CODE_NOT_CONFIRMED) {
        setUser(e.response?.data?.user)
        setOpenConfirmation(true)
      }
    } finally {
      setLoading(false)
    }
  }

  async function checkAvatarDialog() {
    if (user != null) {
      if (!user?.avatar_dialog) {
        await dashboardService.hideAvatarDialog()
        setOpenAvatar(true)
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    checkAvatarDialog()
  }, [user])

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
      <p>Here is your avatar: <img src={`${BASE_URL}/${user.avatars.medium}`} /></p>
    )
  }

  return (
    <div>
      You are logged in user: { user.username }
      { avatarStr }
      <ConfirmationModal
        user={user}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      />
      <AvatarModal
        open={openAvatar}
        setOpen={setOpenAvatar}
        setUser={setUser}
      />
    </div>
  )
}