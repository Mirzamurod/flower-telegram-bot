import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface IProps {
  search: string
  setSearch: (value: string) => void
}

const TableHeader: FC<IProps> = props => {
  const { search, setSearch } = props

  return (
    <div className='flex flex-col mb-4'>
      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Bouquets
      </h2>
      <div className='flex justify-between'>
        <Input
          placeholder='Search'
          value={search}
          className='w-auto max-w-[300px]'
          onChange={e => setSearch(e.target.value)}
        />
        <Button>
          <Link href='/bouquets/add'>Add Bouquet</Link>
        </Button>
      </div>
    </div>
  )
}

export default TableHeader
