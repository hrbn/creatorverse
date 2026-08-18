import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CreatorForm } from '../components/CreatorForm'
import {
  creatorToFormValues,
  deleteCreator,
  fetchCreator,
  getErrorMessage,
  updateCreator,
} from '../services/creators'
import type { Creator, CreatorFormValues } from '../types'

export function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let isCurrent = true

    async function loadCreator() {
      if (!id) {
        setLoadError('Creator URL is missing an id.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setLoadError(null)

      try {
        const creator = await fetchCreator(id)

        if (isCurrent) {
          setCreator(creator)
        }
      } catch (loadError) {
        if (isCurrent) {
          setLoadError(getErrorMessage(loadError, 'Could not load this creator.'))
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

  async function handleSubmit(values: CreatorFormValues) {
    if (!creator) return

    setIsSubmitting(true)
    setFormError(null)

    try {
      const updatedCreator = await updateCreator(creator.id, values)
      navigate(`/creator/${updatedCreator.id}`)
    } catch (submitError) {
      setFormError(getErrorMessage(submitError, 'Could not update this creator.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!creator) return

    const confirmed = window.confirm(`Delete ${creator.name}?`)

    if (!confirmed) return

    setIsDeleting(true)
    setFormError(null)

    try {
      await deleteCreator(creator.id)
      navigate('/')
    } catch (deleteError) {
      setFormError(getErrorMessage(deleteError, 'Could not delete this creator.'))
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <p className="status-message">Loading creator...</p>
  }

  if (loadError || !creator) {
    return (
      <section className="page-section narrow">
        <div className="status-panel" role="alert">
          <p>{loadError ?? 'Creator not found.'}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section form-page edit-creator-page">
      <header className="edit-creator-header">
        <h1>Edit {creator.name}</h1>
      </header>

      <CreatorForm
        key={creator.id}
        error={formError}
        initialValues={creatorToFormValues(creator)}
        isSubmitting={isSubmitting}
        submitLabel="Save changes"
        variant="compact"
        onSubmit={handleSubmit}
      />

      <div className="danger-zone">
        <button
          className="button button-danger"
          type="button"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? 'Deleting...' : 'Delete creator'}
        </button>
      </div>
    </section>
  )
}
