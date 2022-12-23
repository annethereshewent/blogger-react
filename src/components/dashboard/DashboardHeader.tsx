import { SearchOutlined } from '@mui/icons-material'
import { Grid, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { UserService } from '../../services/UserService'
import { UserSearchResult } from '../../types/user/UserSearchResult'
import { DashboardLogo } from './DashboardLogo'
import { SearchList } from './search/SearchList'

interface DashboardHeaderProps {
  title: string
  count?: number
}

export function DashboardHeader({ title, count }: DashboardHeaderProps) {
  const [userResults, setUserResults] = useState<UserSearchResult[]>([])
  const [search, setSearch] = useState('')
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (timer != null) {
      clearTimeout(timer)
    }

    setSearch(e.target.value)
    setTimer(
      setTimeout(async () => {
        if (e.target.value !== '') {
          try {
            console.log('finally making service call')
            const result = await new UserService().searchUsers(e.target.value)

            const { data } = result

            setUserResults(data.users)
          } catch (e) {
            //@TODO
          }
        }
      }, 800)
    )
  }
  return (
    <Grid id="dashboard-header" container>
      <Grid className="logo-column" item xs={1} lg={3}>
        <DashboardLogo />
      </Grid>
      <Grid className="heading-column" item xs={11} md={8} lg={6}>
        <div className="heading-section">
          <div className="heading-title">{title}</div>
          {count && <div className="post-count">{count} posts</div>}
        </div>
      </Grid>
      <Grid className="search-column" item xs={1} lg={3}>
        <TextField
          className="search-text-field"
          fullWidth
          value={search}
          placeholder="Search Blogger"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />
        {userResults && (
          <SearchList
            userResults={userResults}
            setUserResults={setUserResults}
            query={search}
            setQuery={setSearch}
          />
        )}
      </Grid>
    </Grid>
  )
}
