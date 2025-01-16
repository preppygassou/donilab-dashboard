'use client'

import HubManagerLayoutComponent from '../../../components/SidebarHub'

export default function HubManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <HubManagerLayoutComponent>

            {children}

    </HubManagerLayoutComponent>
  )
}