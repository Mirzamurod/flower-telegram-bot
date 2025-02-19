import Link from 'next/link'
import { TColumns } from '@/types/table'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { TOrder } from '@/types/orders'
import { useDispatch } from 'react-redux'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { editOrder } from '@/store/orders'
import { useAppSelector } from '@/store'

const columns: TColumns[] = [
  { field: 'orderNumber', headerName: 'Zakaz nomeri' },
  {
    field: 'status',
    headerName: "Holarni o'zgartirish",
    renderCell: ({ row }: { row: TOrder }) => {
      const dispatch = useDispatch()

      const { isLoading } = useAppSelector(state => state.orders)

      const confirm = () => dispatch(editOrder({ status: 'old' }, row._id))

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size='sm'>Tayyor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ishonchingiz komilmi?</DialogTitle>
            </DialogHeader>
            <DialogFooter className='gap-2'>
              <Button onClick={confirm} disabled={isLoading}>
                Ha
              </Button>
              <DialogClose asChild>
                <Button variant='secondary' disabled={isLoading}>
                  Yo'q
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    field: 'customerId',
    headerName: 'Mijoz raqami',
    renderCell: ({ row }: { row: TOrder }) => <p>{row.customerId.phone}</p>,
  },
  {
    field: 'bouquetId',
    headerName: 'Buketlar soni',
    renderCell: ({ row }: { row: TOrder }) => <p>{row.bouquet?.qty}</p>,
  },
  {
    field: 'flowersId',
    headerName: 'Gullar soni',
    renderCell: ({ row }: { row: TOrder }) => <p>{row.flower?.qty}</p>,
  },
  {
    field: 'action',
    headerName: 'action',
    className: 'text-end',
    renderCell: ({ row }: { row: TOrder }) => (
      <>
        <Button asChild size='icon' variant='outline' className='mr-2'>
          <Link href={`/orders/view/${row._id}`}>
            <Eye />
          </Link>
        </Button>
      </>
    ),
  },
]

export default columns
