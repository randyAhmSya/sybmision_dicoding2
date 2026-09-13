import { formatDistanceToNowStrict } from 'date-fns'
import { id } from 'date-fns/locale'

function postedAt (date) {
  try {
    return formatDistanceToNowStrict(new Date(date), {
      addSuffix: true,
      locale: id
    })
  } catch {
    return date
  }
}

export { postedAt }
