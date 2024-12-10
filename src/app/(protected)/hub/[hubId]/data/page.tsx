'use client'

import { HubDataForm } from '@/components/views/hub/hub-data-form'
import { useParams } from 'next/navigation'

export default function HubDataPage() {
  const params = useParams()
  const hubId = params.hubId as string

  return (
    
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Hub Data</h2>
        <HubDataForm hubId={hubId} />
      </div>
    
  )
}