import { Reply } from '../../../types/post/Reply'

interface ReplyCardProps {
  reply: Reply
}

export function ReplyCard({ reply }: ReplyCardProps) {
  return (
    <div id="reply-card" className="post-card">
      <div className="reply"></div>
    </div>
  )
}
