import axios from 'axios'
// import i18n from '@/languages/i18n'
import { getSession } from 'next-auth/react'
import { encode } from 'js-base64'
import { generateToken } from '@/lib/generate-token'
import { TFlower } from '@/types/middleware'

const middleware =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: { type: string; payload: TFlower }) => {
    if (action.type !== 'flower') {
      next(action)
      return
    }

    next(action)

    const { url, method, params, data, onStart, onSuccess, onFail } = action.payload

    const session = await getSession()
    const token = await generateToken(session?.currentUser?._id)

    const headers = token ? { Authorization: `Bearer ${encode(token)}` } : null

    dispatch({ type: onStart })

    // @ts-ignore
    axios({
      baseURL: 'http://localhost:5000/api/',
      method,
      data,
      url,
      params,
      headers,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch({ type: onSuccess, payload: res.data })
          if (res.data.message) {
            // toast({
            //   status: 'success',
            //   position: 'top-right',
            //   isClosable: true,
            //   variant: 'left-accent',
            //   title: i18n?.t(res.data?.message),
            // })
          }
        } else dispatch({ type: onFail, payload: res })
      })
      .catch(error => {
        if (error?.response?.statusCode === 401) {
        } else {
          const data = error?.response?.data
          if (data?.message) {
            // toast({
            //   status: 'warning',
            //   position: 'top-right',
            //   isClosable: true,
            //   variant: 'left-accent',
            //   title: i18n?.t(data?.message),
            // })
          }
          dispatch({ type: onFail, payload: error?.response?.data })
        }
      })
  }

export default middleware
