'use client'

import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Table from '@/components/table'
import { TSortModel } from '@/types/table'
import { TChild } from '@/types/child'
import TableHeader from '../_components/list/TableHeader'
import columns from '../_components/list/columns'
import { useAppSelector } from '@/store'
import { getFlowers } from '@/store/flowers'

const OrdersNewList: FC<TChild> = () => {
  const dispatch = useDispatch()
  const [ordering, setOrdering] = useState<TSortModel | null>(null)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('10')

  const { isLoading, orders, pageCount, success } = useAppSelector(state => state.orders)

  const getData = () =>
    dispatch(
      getFlowers({
        search,
        page,
        pageCount: limit,
        sortName: ordering?.field,
        sortValue: ordering?.sort,
        status: 'new',
      })
    )

  useEffect(() => {
    getData()
  }, [search, page, limit, ordering?.field, ordering?.sort])

  useEffect(() => {
    if (success) getData()
  }, [success])

  const onChange = (item: { page: number; limit: string }) => {
    setPage(item.page)
    setLimit(item.limit)
  }

  return (
    <div>
      <TableHeader setSearch={setSearch} />
      <Table
        data={orders}
        columns={columns}
        loading={isLoading}
        pageCount={pageCount}
        sortModel={ordering}
        paginationModel={{ page, pageSize: limit }}
        onPaginationModelChange={newItem =>
          onChange({ page: newItem.page, limit: newItem.pageSize })
        }
        onSortModelChange={sort => setOrdering(sort)}
      />
    </div>
  )
}

export default OrdersNewList
