import { useState, useEffect } from 'react'
import { User } from "../../types/User"
import { DashboardService } from "../../services/DashboardService"
import { CircularProgress, Grid } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { ConfirmationModal } from './ConfirmationModal'
import { AvatarModal } from './AvatarModal'
import '../../styles/dashboard.scss'
import { DashboardContainer } from './DashboardContainer'
import { PostModal } from './PostModal'
import { Post } from '../../types/Post'

const CODE_NOT_CONFIRMED = 100
const BASE_URL = process.env.REACT_APP_BASE_URL

export function Dashboard() {
  const [user, setUser] = useState<User>()
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [openAvatar, setOpenAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  const navigate = useNavigate()

  const dashboardService = new DashboardService()

  async function getPosts() {
    try {
      const result = await dashboardService.fetchPosts()

      const { data } = result

      setPosts(data.posts)
    } catch (e: any) {
      // @TODO: add error handling
    }
  }

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
        try {
          await dashboardService.hideAvatarDialog()
          setOpenAvatar(true)
        } catch (e: any) {
          // @TODO: add error handling
        }
      }
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
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
      <p>
        Here is your avatar: <img src={`${BASE_URL}${user.avatars.large}`} />
        <br />
        medium avatar: <img src={`${BASE_URL}${user.avatars.medium}`} />
        <br />
        small avatar: <img src={`${BASE_URL}${user.avatars.small}`} />
        <br />
        thumb avatar: <img src={`${BASE_URL}${user.avatars.thumb}`} />
      </p>
    )
  }

  return (
    <div>
      {/* You are logged in user: { user.username }
      { avatarStr } */}
      <DashboardContainer
        user={user}
        setOpenPostModal={setOpenPostModal}
        posts={posts}
      />
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
      <PostModal
        open={openPostModal}
        avatar={user.avatars.small}
        setOpen={setOpenPostModal}
        posts={posts}
        setPosts={setPosts}
      />
    </div>
  )
}