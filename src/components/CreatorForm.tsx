import { useState } from 'react'
import type { FormEvent } from 'react'
import type { CreatorFormValues } from '../types'

type CreatorFormProps = {
  error: string | null
  initialValues: CreatorFormValues
  isSubmitting: boolean
  submitLabel: string
  variant?: 'default' | 'compact'
  onSubmit: (values: CreatorFormValues) => Promise<void>
}

export function CreatorForm({
  error,
  initialValues,
  isSubmitting,
  submitLabel,
  variant = 'default',
  onSubmit,
}: CreatorFormProps) {
  const [values, setValues] = useState(initialValues)
  const isCompact = variant === 'compact'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void onSubmit(values)
  }

  function updateValue(field: keyof CreatorFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  return (
    <form
      className={`creator-form${isCompact ? ' creator-form--compact' : ''}`}
      onSubmit={handleSubmit}
    >
      {error ? <p className="form-error">{error}</p> : null}

      <label htmlFor="creator-name">
        Name
        <input
          id="creator-name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={(event) => updateValue('name', event.target.value)}
        />
      </label>

      <label htmlFor="creator-url">
        Channel URL
        <input
          id="creator-url"
          name="url"
          type="url"
          required
          value={values.url}
          onChange={(event) => updateValue('url', event.target.value)}
        />
      </label>

      <label htmlFor="creator-description">
        Description
        <textarea
          id="creator-description"
          name="description"
          required
          rows={isCompact ? 4 : 5}
          value={values.description}
          onChange={(event) => updateValue('description', event.target.value)}
        />
      </label>

      <label htmlFor="creator-image-url">
        Image URL
        <input
          id="creator-image-url"
          name="imageURL"
          type="url"
          value={values.imageURL}
          onChange={(event) => updateValue('imageURL', event.target.value)}
        />
      </label>

      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
