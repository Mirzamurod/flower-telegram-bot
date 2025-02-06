import { TSidebarItem } from '@/types/sidebar'
import { Flower2, Home, List } from 'lucide-react'
import { GiHerbsBundle } from 'react-icons/gi'
import { IoMdAddCircleOutline } from 'react-icons/io'

export const sidebar: TSidebarItem[] = [
  { title: 'Dashboard', icon: Home, href: '/' },
  {
    title: 'Bouquets',
    icon: GiHerbsBundle,
    children: [
      { title: 'List Bouquets', icon: List, href: '/bouquets/list' },
      { title: 'Add Bouquet', icon: IoMdAddCircleOutline, href: '/bouquets/add' },
    ],
  },
  {
    title: 'Flowers',
    icon: Flower2,
    children: [
      { title: 'List Flowers', icon: List, href: '/flowers/list' },
      { title: 'Add Flower', icon: IoMdAddCircleOutline, href: '/flowers/list' },
    ],
  },
]
