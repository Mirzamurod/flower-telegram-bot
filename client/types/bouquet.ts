import { TError } from './error'

export type TBouquet = {
  _id: string
  email: string
  image: string
  name?: string
  block: boolean
}

export interface IBouquetStore {
  isLoading: boolean
  bouquet: TBouquet | null
  bouquets: TBouquet[]
  errors: TError[] | null
  success: boolean
}
