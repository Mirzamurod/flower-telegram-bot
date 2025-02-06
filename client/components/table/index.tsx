'use client'

import { createElement, FC } from 'react'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as ShadTable,
} from '../ui/table'
import { TColumns, TTable } from '@/types/table'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const Table: FC<TTable> = props => {
  const {
    data,
    columns,
    loading,
    pageCount,
    sortModel,
    paginationModel,
    footerPagination = true,
    onSortModelChange,
    onPaginationModelChange,
    pageSizeOptions = ['10', '20', '50'],
  } = props

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ]

  const changeSortable = (column: TColumns) => {
    if (column.sortable) !column.renderCell && changeSort(column.field)
  }

  const changeSort = (field: string) => {
    if (!sortModel) onSortModelChange!({ field, sort: 'asc' })
    else {
      if (sortModel.field === field) {
        if (sortModel.sort === 'asc') onSortModelChange!({ field, sort: 'desc' })
        else onSortModelChange!(null)
      } else onSortModelChange!({ field, sort: 'asc' })
    }
  }

  return (
    <div>
      <ShadTable>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead {...column} key={column.field} onClick={() => changeSortable(column)}>
                {column.headerName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading || (!loading && !data.length) ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                {loading ? (
                  <div className='flex justify-center items-center'>
                    <Loader2 />
                  </div>
                ) : (
                  <p>no data</p>
                )}
              </TableCell>
            </TableRow>
          ) : (
            data.map(item => (
              <TableRow key={item._id}>
                {columns.map((column, index) => (
                  <TableCell {...column} key={index}>
                    {column.renderCell
                      ? createElement(column.renderCell as any, { row: item })
                      : item[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadTable>
      {footerPagination && !loading ? (
        <div className='mt-2 items-center justify-center'>
          <Select
            value={paginationModel?.pageSize ?? '10'}
            onValueChange={value => onPaginationModelChange!({ page: 1, pageSize: value })}
          >
            <SelectTrigger className='w-auto'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions?.map(item => (
                <SelectItem value={item + ''} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
    </div>
  )
}

export default Table
