import { createSlice } from '@reduxjs/toolkit'
import { bouquets, flower } from '@/store/apis'
import { IBouquetStore } from '@/types/bouquet'

const initialState: IBouquetStore = {
  isLoading: false,
  bouquets: [],
  bouquet: null,
  errors: null,
  success: false,
}

const bouquet = createSlice({
  name: 'bouquet',
  initialState,
  reducers: {
    onStartBetBouquets: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessBetBouquets: (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
      state.bouquets = payload
    },
    onFailBetBouquets: state => {
      state.isLoading = false
    },
  },
})

export const getBouquets = (params?: any) =>
  flower({
    url: bouquets,
    method: 'get',
    params,
    onStart: bouquet.actions.onStartBetBouquets.type,
    onSuccess: bouquet.actions.onSuccessBetBouquets.type,
    onFail: bouquet.actions.onFailBetBouquets.type,
  })

export default bouquet.reducer
