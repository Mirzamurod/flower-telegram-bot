import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronUp, User2 } from 'lucide-react'
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  Sidebar as ShadSidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
} from '../ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { sidebar } from '@/lib/constants'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <ShadSidebar className='bg-background'>
      <SidebarHeader>
        <div className='flex gap-2 items-center'>
          <Image src='/flower-icon.webp' alt='flower-icon' width={40} height={40} />
          <p className='text-xl'>Flowers</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebar.map(item => (
                <SidebarMenuItem key={item.title}>
                  {item.href ? (
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={{ pathname: item.href, query: item.query }}>
                        <item.icon size={16} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenu className='flex flex-row items-center p-2'>
                      <item.icon size={16} />
                      {item.title}
                    </SidebarMenu>
                  )}
                  {item.children?.length
                    ? item.children.map(child => (
                        <SidebarMenuSub key={child.title}>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === child.href}>
                              <Link href={{ pathname: child.href, query: child.query }}>
                                <child.icon size={16} />
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      ))
                    : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadSidebar>
  )
}

export default Sidebar
