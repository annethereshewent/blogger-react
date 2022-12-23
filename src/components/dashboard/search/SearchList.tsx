import { List } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { UserSearchResult } from '../../../types/user/UserSearchResult'
import { SearchResult } from './SearchResult'

interface SearchListProps {
  userResults: UserSearchResult[]
  setUserResults: (results: UserSearchResult[]) => void
  query: string
  setQuery: (query: string) => void
}

export function SearchList({ userResults, setUserResults, query, setQuery }: SearchListProps) {
  const navigate = useNavigate()
  function handleClick(username: string) {
    setUserResults([])
    setQuery('')
    navigate(`/profile/${username}`)
  }
  return (
    <List id="search-list" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {userResults.map((result) => (
        <SearchResult
          onClick={() => handleClick(result.username)}
          key={result.username}
          item={result}
        />
      ))}
    </List>
  )
}
