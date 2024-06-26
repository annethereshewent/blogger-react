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

    if (e.target.value !== '') {
      setTimer(
        setTimeout(async () => {
          try {
            const result = await new UserService().searchUsers(e.target.value)

            const { data } = result

            setUserResults(data.users)
          } catch (e) {
            //@TODO
          }
        }, 800)
      )
    } else {
      setUserResults([])
    }
    document.addEventListener('click', (event) => {
      const node = document.getElementById('search-results')

      if (!node?.contains(event.target as Node)) {
        setUserResults([])
        setSearch('')
      }
    })
  }
  return (
    <Grid id="dashboard-header" container>
      <Grid className="logo-column" item xs={1} lg={3}>
        <DashboardLogo />
      </Grid>
      <Grid className="heading-column" item xs={11} md={8} lg={6}>
        <div className="heading-section">
          <div className="heading-title">{title}</div>
          {count != null && (
            <div className="post-count">
              {count} {count === 1 ? 'post' : 'posts'}
            </div>
          )}
        </div>
      </Grid>
      <Grid className="search-column" item xs={1} lg={3}>
        <div id="search-results">
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
        </div>
      </Grid>
    </Grid>
  )
}
