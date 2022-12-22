import '../../styles/dashboard.scss'
import { PostsContainer } from '../dashboard/posts/PostsContainer'
import { useEffect, useState } from 'react'
import { User } from '../../types/user/User'
import { useUser } from '../../hooks/useUser'
import { DashboardContainer } from '../dashboard/DashboardContainer'
import { ConfirmationModal } from '../dashboard/ConfirmationModal'
import { PostModal } from '../dashboard/posts/PostModal'
import { AvatarModal } from '../dashboard/avatar/AvatarModal'
import { Post } from '../../types/post/Post'
import { useParams } from 'react-router-dom'
import { UserService } from '../../services/UserService'
import { ProfileHeader } from './ProfileHeader'
import { EditProfileModal } from './EditProfileModal'

export function UserProfile() {
  const [user, setUser] = useState<User>()
  const [profileUser, setProfileUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [openAvatar, setOpenAvatar] = useState(false)
  const [page, setPage] = useState(1)
  const [openEditProfile, setOpenEditProfile] = useState(false)

  const { username } = useParams()

  useUser(setLoading, setUser, setOpenConfirmation, false)

  // fetch user and posts for the profile
  useEffect(() => {
    fetchPosts(setHasMore)
    getUser()
  }, [username])

  async function fetchPosts(setHasMore: (hasMore: boolean) => void) {
    if (!loading) {
      try {
        if (username != null) {
          setLoading(true)
          const result = await new UserService().getProfilePosts(username, page)

          const { data } = result

          setPage(page + 1)

          if (data.posts.length) {
            const concatedPosts = posts.concat(data.posts)

            setPosts(concatedPosts)
          } else {
            setHasMore(false)
          }
        }
      } catch (e: any) {
        // @TODO: add error handling
      } finally {
        setLoading(false)
      }
    }
  }

  async function getUser() {
    setLoading(true)
    try {
      if (username != null) {
        const result = await new UserService().getUserData(username)

        const { data } = result

        setProfileUser(data.user)
      }
    } catch (e) {
      //@TODO
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    //
    setOpenEditProfile(false)
  }

  return (
    <div>
      {profileUser && (
        <div>
          <DashboardContainer
            user={user}
            setOpenPostModal={setOpenPostModal}
            title={profileUser.display_name}
            count={profileUser.post_count}
          >
            <ProfileHeader
              profileUser={profileUser}
              user={user}
              setUser={setUser}
              setProfileUser={setProfileUser}
              setOpen={setOpenEditProfile}
            />
            <PostsContainer
              posts={posts}
              fetchPosts={fetchPosts}
              hasMore={hasMore}
              setHasMore={setHasMore}
              setPosts={setPosts}
              user={user}
            />
          </DashboardContainer>
          <ConfirmationModal user={user} open={openConfirmation} setOpen={setOpenConfirmation} />
          <AvatarModal open={openAvatar} setOpen={setOpenAvatar} setUser={setUser} />
          <PostModal
            open={openPostModal}
            avatar={user?.avatars?.small}
            setOpen={setOpenPostModal}
            posts={posts}
            setPosts={setPosts}
          />
          {user && (
            <EditProfileModal
              open={openEditProfile}
              handleClose={handleClose}
              user={user}
              setUser={setUser}
              setProfileUser={setProfileUser}
            />
          )}
        </div>
      )}
    </div>
  )
}
