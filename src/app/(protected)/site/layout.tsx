'use client'

import SiteMabagerLayoutComponent from '@/components/SidebarSite'

export default function SiteMabagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <SiteMabagerLayoutComponent>

            {children}

    </SiteMabagerLayoutComponent>
  )
}