import { Avatar, Badge, Chip, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { UserSearchResult } from '../../../types/user/UserSearchResult'

interface SearchResultProps {
  item: UserSearchResult
  onClick: () => void
}

export function SearchResult({ item, onClick }: SearchResultProps) {
  return (
    <ListItem onClick={onClick}>
      <ListItemAvatar>
        <Avatar src={item.avatar} />
      </ListItemAvatar>
      <ListItemText primary={item.display_name} secondary={`@${item.username}`} />
      {item.is_followed && item.is_following && <Chip label="Follow each other" />}
      {item.is_following && !item.is_followed && <Chip label="Follows you" />}
      {!item.is_following && item.is_followed && <Chip label="Following" />}
    </ListItem>
  )
}
