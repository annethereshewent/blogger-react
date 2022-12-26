import { DashboardService } from '../services/DashboardService'
import { User } from '../types/user/User'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CODE_NOT_CONFIRMED = 100

export function useUser(
  setLoading: (loading: boolean) => void,
  setUser: (user: User) => void,
  setOpenConfirmation: ((confirmation: boolean) => void) | null,
  isPrivate: boolean
) {
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    async function getUser() {
      try {
        const result = await new DashboardService().getUserData()
        const { data } = result

        setUser(data.user)
      } catch (e: any) {
        // navigate back to the dashboard if status is 401
        if (isPrivate) {
          if (e.response.status === 401) {
            localStorage.removeItem('apiToken')
            navigate('/')
          }
        }
        if (setOpenConfirmation != null) {
          if (e.response?.status === 400 && e.response?.data?.code === CODE_NOT_CONFIRMED) {
            setUser(e.response.data.user)
            setOpenConfirmation(true)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])
}
