'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TBouquetForm } from '@/types/bouquet'
import { useAppSelector } from '@/store'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AddEditCard from '../_components/addEdit/AddEditCard'
import AddEditAction from '../_components/addEdit/AddEditAction'

const AddEditBouquet = () => {
  const dispatch = useDispatch()
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
  const { handleSubmit, setValue, setError, reset } = methods

  const { success, bouquet, errors } = useAppSelector(state => state.bouquet)

  const onSubmit = (values: TBouquetForm) => {
    console.log(values)
  }

  useEffect(() => {
    if (bouquet)
      Object.entries(bouquet).map(([key, value]) => setValue(key as keyof TBouquetForm, value))
  }, [bouquet])

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
        <AddEditCard />
        <AddEditAction />
      </form>
    </FormProvider>
  )
}

export default AddEditBouquet
