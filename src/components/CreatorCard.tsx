import { Link } from 'react-router-dom'
import type { Creator } from '../types'
import { getCreatorInitials, getUrlHost } from '../utils/creatorDisplay'

type CreatorCardProps = {
  creator: Creator
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <article className="creator-card">
      <Link
        className="creator-card__body"
        to={`/creator/${creator.id}`}
        aria-label={`View ${creator.name}`}
      >
        <div className="creator-card__image" aria-hidden="true">
          {creator.imageURL ? (
            <img src={creator.imageURL} alt="" loading="lazy" />
          ) : (
            <span>{getCreatorInitials(creator.name)}</span>
          )}
        </div>
        <div className="creator-card__content">
          <h2>{creator.name}</h2>
          <p>{creator.description}</p>
        </div>
      </Link>
      <div className="creator-card__actions">
        <a href={creator.url} target="_blank" rel="noreferrer">
          {getUrlHost(creator.url)}
        </a>
        <Link to={`/creator/${creator.id}/edit`}>Edit</Link>
      </div>
    </article>
  )
}
