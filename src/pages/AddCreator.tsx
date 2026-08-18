import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreatorForm } from '../components/CreatorForm'
import {
  createCreator,
  emptyCreatorForm,
  getErrorMessage,
} from '../services/creators'
import type { CreatorFormValues } from '../types'

export function AddCreator() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values: CreatorFormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      const creator = await createCreator(values)
      navigate(`/creator/${creator.id}`)
    } catch (submitError) {
      setError(getErrorMessage(submitError, 'Could not add this creator.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-section form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">New creator</p>
          <h1>Add a creator</h1>
        </div>
      </div>
      <CreatorForm
        error={error}
        initialValues={emptyCreatorForm}
        isSubmitting={isSubmitting}
        submitLabel="Add creator"
        onSubmit={handleSubmit}
      />
    </section>
  )
}
