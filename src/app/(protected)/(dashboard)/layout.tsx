'use client'

import DashboardLayoutC from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <DashboardLayoutC>

            {children}

    </DashboardLayoutC>
  )
}