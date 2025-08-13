import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/common/ui/breadcrumb';
import React from 'react';
import { Separator } from '@/components/common/ui/separator';
import { SidebarTrigger } from '@/components/common/ui/sidebar';

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItemType[];
};

export const DashboardBreadcrumb = ({ items }: Props) => {
  return (
    <header className="z-20 flex h-16 w-full shrink-0 items-center gap-2 backdrop-blur-xs transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <React.Fragment key={item.label}>
                  <BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
                    {isLast || !item.href ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className={index === 0 ? 'hidden md:block' : ''} />
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

// usage
{
  /*
<DashboardBreadcrumb
  items={[
    { label: "ダッシュボード", href: "/dashboard" },
    { label: "ブログ", href: "/dashboard/blogs" },
    { label: "記事編集" },
  ]}
/>
*/
}
