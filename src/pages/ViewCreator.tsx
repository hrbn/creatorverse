import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCreator, getErrorMessage } from '../services/creators'
import type { Creator } from '../types'
import { getCreatorInitials, getUrlHost } from '../utils/creatorDisplay'

export function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isCurrent = true

    async function loadCreator() {
      if (!id) {
        setError('Creator URL is missing an id.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const creator = await fetchCreator(id)

        if (isCurrent) {
          setCreator(creator)
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(getErrorMessage(loadError, 'Could not load this creator.'))
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadCreator()

    return () => {
      isCurrent = false
    }
  }, [id])

  if (isLoading) {
    return <p className="status-message">Loading creator...</p>
  }

  if (error || !creator) {
    return (
      <section className="page-section narrow">
        <div className="status-panel" role="alert">
          <p>{error ?? 'Creator not found.'}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section narrow">
      <div className="creator-detail">
        <div className="creator-detail__image" aria-hidden="true">
          {creator.imageURL ? (
            <img src={creator.imageURL} alt="" />
          ) : (
            <span>{getCreatorInitials(creator.name)}</span>
          )}
        </div>
        <div className="creator-detail__content">
          <p className="eyebrow">{getUrlHost(creator.url)}</p>
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>
          <div className="action-row">
            <a className="button button-primary" href={creator.url} target="_blank" rel="noreferrer">
              Visit channel
            </a>
            <Link className="button button-secondary" to={`/creator/${creator.id}/edit`}>
              Edit creator
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
