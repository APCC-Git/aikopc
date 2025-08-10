'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  BookOpen,
  CodeXml,
  Users,
  Laptop,
  Gamepad2,
  Database,
  FilePenLine,
  Rocket,
  SquareArrowOutUpRight,
} from 'lucide-react';

import { NavMain } from '@/components/dashboard/nav-main';
import { NavProjects } from '@/components/dashboard/nav-projects';
import { NavSecondary } from '@/components/dashboard/nav-secondary';
import { NavUser } from '@/components/dashboard/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/common/ui/sidebar';
import { type } from 'node:os';
import { User } from '@/types/prisma';

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
      isActive: false,
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
    {
      title: 'プロジェクト',
      url: '/dashboard/projects',
      icon: Rocket,
      items: [
        {
          title: '一覧',
          url: '/dashboard/projects/view',
        },
        {
          title: '作成',
          url: '/dashboard/projects/create',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'ユーザー管理',
      url: '/dashboard/user',
      icon: Users,
    },
    {
      title: 'DB管理',
      url: '/dashboard/db',
      icon: Database,
    },
    {
      title: 'Nginx UI',
      url: 'https://t.aikopc.net',
      icon: SquareArrowOutUpRight,
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
              <a href="/">
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
        {user.role === 'admin' && <NavSecondary items={data.navSecondary} className="mt-auto" />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
