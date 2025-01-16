'use client'

import ErrorAlert from '../../../../../components/ErrorAlert'
import LoadingSpinner from '../../../../../components/LoadingSpinner'
import { HubDataForm } from '../../../../../components/views/hub/hub-data-form'
import { useHub } from '../../../../../hooks/useHubs'
import { useParams } from 'next/navigation'

export default function HubDataPage() {
  const params = useParams()
  const hubId = params.hubId as string


    const { data: hub, isLoading, error } = useHub(hubId);
  
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message="Hub not found" />;
  
    

  return (
    
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Hub Data</h2>
        <HubDataForm hubId={hubId} hub={hub} />
      </div>
    
  )
}