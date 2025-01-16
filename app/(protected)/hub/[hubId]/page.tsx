'use client'


import { HubDetails } from '../../../../components/views/hub/hub-details'
import { useParams } from 'next/navigation'

export default function HubPage() {
  const params = useParams()
  const hubId = params.hubId as string

  return (
    
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Hub Details</h2>
        <HubDetails hubId={hubId} />
      </div>
   
  )
}