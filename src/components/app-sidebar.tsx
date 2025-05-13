'use client';

import * as React from 'react';
import Image from 'next/image';
import { BookOpen, CodeXml, LifeBuoy, Laptop, Gamepad2, Send, FilePenLine } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type } from 'node:os';

const data = {
  user: {
    name: 'admin',
    id: '69119',
    avatar: '/logo.png',
  },
  navMain: [
    {
      title: 'ブログ',
      url: '/dashboard/blog',
      icon: FilePenLine,
      isActive: true,
      items: [
        {
          title: '作成',
          url: '/dashboard/blog/create',
        },
        {
          title: '下書き',
          url: '/dashboard/blog/draft',
        },
      ],
    },
    {
      title: '講座',
      url: '/dashboard/course',
      icon: BookOpen,
      items: [
        {
          title: 'スケジュール',
          url: '/dashboard/course/schedule',
        },
        {
          title: '講座一覧',
          url: '/dashboard/course/lessons',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'C++',
      url: '#',
      icon: CodeXml,
    },
    {
      name: 'ゲーム',
      url: '#',
      icon: Gamepad2,
    },
    {
      name: '自作PC',
      url: '#',
      icon: Laptop,
    },
  ],
};

type User = {
  userId: string;
  userName: string;
  iat: number;
  exp: number;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src={'/icons/icon-192.png'}
                    width={192}
                    height={192}
                    className={'rounded-sm'}
                    alt={'logo'}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Aikopc.net</span>
                  <span className="truncate text-xs">愛光学園パソコン部</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {/*<NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
