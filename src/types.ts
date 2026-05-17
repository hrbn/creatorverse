export type Creator = {
  id: number
  name: string
  url: string
  description: string
  imageURL: string | null
}

export type CreatorPayload = {
  name: string
  url: string
  description: string
  imageURL: string | null
}

export type CreatorFormValues = {
  name: string
  url: string
  description: string
  imageURL: string
}
