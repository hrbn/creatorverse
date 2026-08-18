import { supabase } from '../client'
import { starterCreators } from '../data/starterCreators'
import type { Creator, CreatorFormValues, CreatorPayload } from '../types'

const creatorColumns = 'id,name,url,description,imageURL'
const starterSeedKey = 'creatorverse:starter-creators-seeded'

let starterSeedRequest: Promise<Creator[]> | null = null

export const emptyCreatorForm: CreatorFormValues = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
}

export function creatorToFormValues(creator: Creator): CreatorFormValues {
  return {
    name: creator.name,
    url: creator.url,
    description: creator.description,
    imageURL: creator.imageURL ?? '',
  }
}

export function formValuesToPayload(values: CreatorFormValues): CreatorPayload {
  const imageURL = values.imageURL.trim()

  return {
    name: values.name.trim(),
    url: values.url.trim(),
    description: values.description.trim(),
    imageURL: imageURL.length > 0 ? imageURL : null,
  }
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function parseCreatorId(id: string) {
  const creatorId = Number(id)

  if (!Number.isInteger(creatorId) || creatorId <= 0) {
    throw new Error('Invalid creator id.')
  }

  return creatorId
}

export async function fetchCreators() {
  const { data, error } = await supabase
    .from('creators')
    .select(creatorColumns)
    .order('id', { ascending: true })

  if (error) throw error

  return data ?? []
}

export async function fetchCreator(id: string) {
  const { data, error } = await supabase
    .from('creators')
    .select(creatorColumns)
    .eq('id', parseCreatorId(id))
    .single()

  if (error) throw error

  return data
}

export async function createCreator(values: CreatorFormValues) {
  const { data, error } = await supabase
    .from('creators')
    .insert(formValuesToPayload(values))
    .select(creatorColumns)
    .single()

  if (error) throw error

  return data
}

export async function updateCreator(id: number, values: CreatorFormValues) {
  const { data, error } = await supabase
    .from('creators')
    .update(formValuesToPayload(values))
    .eq('id', id)
    .select(creatorColumns)
    .single()

  if (error) throw error

  return data
}

export async function deleteCreator(id: number) {
  const { error } = await supabase.from('creators').delete().eq('id', id)

  if (error) throw error
}

export async function ensureStarterCreators(creators: Creator[]) {
  if (creators.length > 0 || window.localStorage.getItem(starterSeedKey)) {
    return creators
  }

  // StrictMode mounts effects twice in development, so two callers can both see
  // an empty table before either insert lands. Claim the guard up front and let
  // the second caller await the first request instead of seeding again.
  if (!starterSeedRequest) {
    window.localStorage.setItem(starterSeedKey, 'true')
    starterSeedRequest = seedStarterCreators()
  }

  return starterSeedRequest
}

async function seedStarterCreators(): Promise<Creator[]> {
  try {
    const { data, error } = await supabase
      .from('creators')
      .insert(starterCreators)
      .select(creatorColumns)

    if (error) throw error

    return data ?? []
  } catch (seedError) {
    window.localStorage.removeItem(starterSeedKey)
    starterSeedRequest = null
    throw seedError
  }
}
