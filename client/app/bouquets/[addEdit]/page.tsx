'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TBouquetForm } from '@/types/bouquet'
import { useAppSelector } from '@/store'
import { Button } from '@/components/ui/button'
import AddEditCard from '../_components/addEdit/AddEditCard'
import AddEditAction from '../_components/addEdit/AddEditAction'
import { addBouquet, editBouquet, getBouquet } from '@/store/bouquet'

const AddEditBouquet = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addEdit } = useParams()
  const formSchema = yup.object().shape({
    price: yup.string().required('price_required'),
    name: yup.string(),
    info: yup.string(),
  })
  const methods = useForm<TBouquetForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { price: '', name: '', info: '' },
  })
  const [image, setImage] = useState('')
  const { handleSubmit, setValue, setError, reset } = methods

  const { success, bouquet, errors } = useAppSelector(state => state.bouquet)

  const onSubmit = (values: TBouquetForm) => {
    if (image) {
      if (addEdit === 'add') dispatch(addBouquet({ ...values, image }))
      else dispatch(editBouquet({ ...values, image }, addEdit as string))
    }
  }

  useEffect(() => {
    if (addEdit && addEdit !== 'add') dispatch(getBouquet(addEdit as string))
    else reset()
  }, [addEdit])

  useEffect(() => {
    if (bouquet) {
      Object.entries(bouquet).map(([key, value]) => setValue(key as keyof TBouquetForm, value))
      setImage(bouquet.image)
    }
  }, [bouquet])

  useEffect(() => {
    if (success) {
      reset()
      router.push('/bouquets/list')
    }
  }, [success])

  useEffect(() => {
    if (errors?.length)
      errors.map(item =>
        setError(item.path as keyof TBouquetForm, { type: 'custom', message: item.msg })
      )
  }, [errors])

  return (
    <FormProvider {...methods}>
      <div className='flex justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
          {addEdit === 'add' ? 'Add bouquet' : 'Edit bouquet'}
        </h2>
        <Button>
          <Link href='/bouquets/list'>Go to bouquet</Link>
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddEditCard image={image} setImage={setImage} />
        <AddEditAction />
      </form>
    </FormProvider>
  )
}

export default AddEditBouquet
