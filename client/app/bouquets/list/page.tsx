'use client'

import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Table from '@/components/table'
import { TSortModel } from '@/types/table'
import { TChild } from '@/types/child'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import TableHeader from '../_components/list/TableHeader'
import columns from '../_components/list/columns'
import { getBouquets } from '@/store/bouquet'

const BouquetsList: FC<TChild> = props => {
  const { searchParams } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const params = new URLSearchParams()
  const [ordering, setOrdering] = useState<TSortModel | null>(null)
  const [search, setSearch] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    dispatch(getBouquets())
  }, [])

  const onChange = (item: { [value: string]: string | string[] | number }) => {}

  return (
    <div>
      <TableHeader search={search} setSearch={setSearch} />
      <Table
        data={[]}
        columns={columns}
        onPaginationModelChange={newItem =>
          onChange({ page: newItem.page, limit: newItem.pageSize })
        }
      />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

export default BouquetsList
