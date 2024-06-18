import linkifyHtml from 'linkifyjs/lib/linkify-html'
import { Post } from '../types/post/Post'

/*
 * Replaces new lines with br tags and auto links urls.
 * @TODO: sanitization already happens
 * on the backend, optionally add it to client side
 */
export function convertPost(post: Post): string {
  if (post.body != null) {
    let bodyHtml = linkifyHtml(post.body.replace(/\n/g, '<br/>'), { target: '_blank' })

    if (post.tags != null) {
      for (const tag of post.tags) {
        const tagRegex = new RegExp(`#${tag}\\b`, 'g')
        bodyHtml = bodyHtml.replace(tagRegex, `<a href="/tags/${tag}">#${tag}</a>`)
      }
    }

    return bodyHtml
  }
  return ''
}
