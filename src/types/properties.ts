export interface Property {
  _id: string
  property: {
    _id: string
    name: string
    city: string
    area: number
    specific_location?: string
    type: string
    bathrooms: number
    bedrooms: number
    price: number
    deposit: number
  }
  images: string[]
  description?: string
  phone?: string
  landlord_id?: string
  rating: number
  featured: boolean
  amenities?: string[]
  comments?: Array<{
    user: string
    date: Date
    text: string
  }>
  createdAt: Date
  updatedAt: Date
  totalClicks: number
  totalImpressions: number
}

export interface Filters {
  type: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  featured: boolean
}
