import { createSlice } from '@reduxjs/toolkit'
import { flowerapi, flowersapi, flower, flowerpublic } from '@/store/apis'
import { IFlowerStore, TFlowerForm } from '@/types/flower'

const initialState: IFlowerStore = {
  isLoading: false,
  flowers: [],
  flower: null,
  errors: null,
  success: false,
  pageCount: 0,
}

const flowers = createSlice({
  name: 'flowers',
  initialState,
  reducers: {
    onStartGetFlowers: state => {
      state.isLoading = true
      state.success = false
      state.flower = null
    },
    onSuccessGetFlowers: (state, { payload }) => {
      state.isLoading = false
      state.flowers = payload.data
      state.pageCount = payload.pageLists
    },
    onFailGetFlowers: state => {
      state.isLoading = false
    },
    // get data
    onStartGetFlower: state => {
      state.isLoading = true
    },
    onSuccessGetFlower: (state, { payload }) => {
      state.isLoading = false
      state.flowers = payload.data
    },
    onFailGetFlower: state => {
      state.isLoading = false
    },
    // add-edit
    onStartAddEditFlower: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddEditFlower: (state, { payload }) => {
      state.isLoading = false
      state.success = payload.success
    },
    onFailAddEditFlower: state => {
      state.isLoading = false
    },
  },
})

export const getFlowers = (params?: any) =>
  flower({
    url: flowersapi,
    method: 'get',
    params,
    onStart: flowers.actions.onStartGetFlowers.type,
    onSuccess: flowers.actions.onSuccessGetFlowers.type,
    onFail: flowers.actions.onFailGetFlowers.type,
  })

export const getPublicFlowers = (id: string, params?: any) =>
  flower({
    url: flowerpublic + id,
    method: 'get',
    params,
    onStart: flowers.actions.onStartGetFlowers.type,
    onSuccess: flowers.actions.onSuccessGetFlowers.type,
    onFail: flowers.actions.onFailGetFlowers.type,
  })

export const getFlower = (id: string) =>
  flower({
    url: flowerapi + id,
    method: 'get',
    onStart: flowers.actions.onStartGetFlower.type,
    onSuccess: flowers.actions.onSuccessGetFlower.type,
    onFail: flowers.actions.onFailGetFlower.type,
  })

export const addFlower = (data: TFlowerForm) =>
  flower({
    url: flowersapi,
    method: 'post',
    data,
    onStart: flowers.actions.onStartAddEditFlower.type,
    onSuccess: flowers.actions.onSuccessAddEditFlower.type,
    onFail: flowers.actions.onFailAddEditFlower.type,
  })

export const editFlower = (data: TFlowerForm, id: string) =>
  flower({
    url: flowerapi + id,
    method: 'patch',
    data,
    onStart: flowers.actions.onStartAddEditFlower.type,
    onSuccess: flowers.actions.onSuccessAddEditFlower.type,
    onFail: flowers.actions.onFailAddEditFlower.type,
  })

export const deleteFlower = (id: string) =>
  flower({
    url: flowerapi + id,
    method: 'delete',
    onStart: flowers.actions.onStartAddEditFlower.type,
    onSuccess: flowers.actions.onSuccessAddEditFlower.type,
    onFail: flowers.actions.onFailAddEditFlower.type,
  })

export default flowers.reducer
