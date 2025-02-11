'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { getPublicBouquets } from '@/store/bouquet'
import { useAppSelector } from '@/store'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Bouquets = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('10')

  const { isLoading, bouquets, pageCount } = useAppSelector(state => state.bouquet)

  useEffect(() => {
    dispatch(getPublicBouquets(userId as string, { page, pageCount: limit }))
  }, [page, pageCount, userId])

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>Bouquets</h2>
        <ModeToggle />
      </div>
      <Separator />
      <div className='mt-4 container grid grid-cols-2 gap-4'>
        {bouquets.map(bouquet => (
          <Card key={bouquet._id} className='w-auto overflow-hidden'>
            <div className='relative w-full h-40'>
              <Image
                src={bouquet.image}
                // width={300}
                // height={200}
                fill
                alt='bouquet image'
                className='object-cover w-full h-auto'
              />
            </div>
            <CardFooter className='p-0'>
              <Button className='w-full rounded-none'>Add</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Bouquets
