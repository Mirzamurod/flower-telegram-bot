'use client'

import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { getPublicBouquets } from '@/store/bouquet'
import { useAppSelector } from '@/store'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TBouquet } from '@/types/bouquet'
import { ShoppingCart } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getSum } from '@/lib/utils'

type TItem = { flowerId: string; qty: number; price: number; image: string }

const Bouquets = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('10')
  const [items, setItems] = useState<TItem[]>([])

  const { isLoading, bouquets, pageCount } = useAppSelector(state => state.bouquet)

  useEffect(() => {
    dispatch(getPublicBouquets(userId as string, { page, pageCount: limit }))
  }, [page, pageCount, userId])

  const onChange = (item: { page: number; limit: string }) => {
    setPage(item.page)
    setLimit(item.limit)
  }

  const changeItem = (item: TBouquet, operator: '-' | '+') => {
    let data: TItem[] = []
    if (!items.some(i => i.flowerId === item._id))
      setItems([...items, { flowerId: item._id, qty: 1, price: item.price, image: item.image }])
    else {
      if (operator === '+') {
        items.map(i =>
          i.flowerId === item._id
            ? data.push({ ...i, qty: i.qty + 1, price: +item.price + +i.price })
            : data.push(i)
        )
        setItems([...data])
      } else {
        if (items.find(i => i.flowerId === item._id)?.qty === 1) {
          items.map(i =>
            i.flowerId !== item._id
              ? data.push({ ...i, qty: i.qty + 1, price: +item.price + +i.price })
              : null
          )
          setItems([...data])
        } else {
          items.map(i =>
            i.flowerId === item._id
              ? data.push({ ...i, qty: i.qty - 1, price: +i.price - +item.price })
              : data.push(i)
          )
          setItems([...data])
        }
      }
    }
  }

  const total = (): { totalUnit: number; totalSum: number } => {
    let totalUnit = 0
    let totalSum = 0

    totalUnit = items.reduce((a, b) => a + b.qty, 0)
    totalSum = items.reduce((a, b) => a + +b.price, 0)

    return { totalUnit, totalSum }
  }

  return (
    <div>
      <div className='sticky top-0 z-20 bg-background'>
        <div className='flex justify-between p-2'>
          <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>Bouquets</h2>
          <div className='flex gap-x-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <ShoppingCart />
                  {items.length ? (
                    <div className='absolute top-0 right-0 bg-primary h-3 w-3 rounded-full' />
                  ) : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {items.map(item => (
                  <Fragment key={item.flowerId}>
                    <div className='flex justify-between items-center'>
                      <Image src={item.image} alt='Bouquet image' width={40} height={50} />
                      <p>{item.qty}</p>
                      <p>{getSum(item.price)}</p>
                    </div>
                    <Separator className='my-2' />
                  </Fragment>
                ))}
                <div className='flex justify-between items-center'>
                  <p>Total:</p>
                  <p>{total().totalUnit}</p>
                  <p>{getSum(total().totalSum)}</p>
                </div>
                <Button className='w-full mt-2' disabled={!items.length}>
                  Zakaz berish
                </Button>
              </PopoverContent>
            </Popover>
            <ModeToggle />
          </div>
        </div>
        <Separator />
      </div>
      <div className='my-4 container'>
        <div className='grid grid-cols-2 gap-4'>
          {isLoading ? (
            [...new Array(4)].map((_, index) => (
              <Card key={index}>
                <Skeleton className='h-40 w-full rounded-none' />
                <Skeleton className='h-8 w-full mt-1 rounded-none' />
              </Card>
            ))
          ) : bouquets.length ? (
            bouquets.map(bouquet => (
              <Card key={bouquet._id} className='w-auto overflow-hidden'>
                <div className='relative w-full h-40'>
                  <Image
                    fill
                    src={bouquet.image}
                    alt='bouquet image'
                    className='object-cover w-full h-auto'
                  />
                  {items.some(item => item.flowerId === bouquet._id) ? (
                    <div className='absolute top-2 left-2 w-6 h-6 text-center rounded-lg bg-primary'>
                      {items.find(item => item.flowerId === bouquet._id)?.qty}
                    </div>
                  ) : null}
                </div>
                <CardFooter className='p-0'>
                  {items.some(item => item.flowerId === bouquet._id) ? (
                    <>
                      <Button
                        variant='destructive'
                        className='w-full rounded-none text-2xl'
                        onClick={() => changeItem(bouquet, '-')}
                      >
                        -
                      </Button>
                      <Button
                        className='w-full rounded-none text-2xl'
                        onClick={() => changeItem(bouquet, '+')}
                      >
                        +
                      </Button>
                    </>
                  ) : (
                    <Button
                      className='w-full rounded-none'
                      onClick={() => changeItem(bouquet, '+')}
                    >
                      Add
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <h3>No data</h3>
          )}
        </div>
        {bouquets.length ? (
          <div className='w-auto mt-4'>
            <ReactPaginate
              previousLabel='<'
              nextLabel='>'
              breakLabel='...'
              pageCount={pageCount! ?? 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={({ selected }) => onChange({ page: selected! + 1, limit })}
              containerClassName='flex gap-2 justify-end'
              pageClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
              activeClassName='bg-green-500 text-white'
              previousClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
              nextClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
              breakClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500 text-gray-500'
              disabledClassName='opacity-50 cursor-not-allowed'
              renderOnZeroPageCount={null}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Bouquets
