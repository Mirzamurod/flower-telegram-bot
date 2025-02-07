import {} from 'react'
import Image from 'next/image'
import { TColumns } from '@/types/table'
import { TBouquet } from '@/types/bouquet'
import { getSum } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Edit, Eye, View, ViewIcon } from 'lucide-react'
import Link from 'next/link'

const columns: TColumns[] = [
  {
    field: 'image',
    headerName: 'image',
    renderCell: ({ row }: { row: TBouquet }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} />
    ),
  },
  {
    field: 'price',
    headerName: 'price',
    renderCell: ({ row }: { row: TBouquet }) => <p>{getSum(row.price)}</p>,
  },
  {
    field: 'action',
    headerName: 'action',
    className: 'text-end',
    renderCell: ({ row }: { row: TBouquet }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className='mr-2'>
            <Button size='icon' variant='outline'>
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View bouquet</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='icon' variant='outline'>
              <Link href={`/bouquets/${row._id}`}>
                <Edit />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit bouquet</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
]

export default columns
