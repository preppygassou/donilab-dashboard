'use client'


import ErrorAlert from '../../../../../components/ErrorAlert'
import LoadingSpinner from '../../../../../components/LoadingSpinner'
import { SiteDataForm } from '../../../../../components/views/site/site-data-form'
import { useSite } from '../../../../../hooks/useSites'
import { useParams } from 'next/navigation'

export default function SiteDataPage() {
  const params = useParams()
  const siteId = params.siteId as string

  const { data: site, isLoading, error } = useSite(siteId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Site not found" />;

  
  return (
    
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Site Data</h2>
        <SiteDataForm siteId={siteId} site={site} />
      </div>
    
  )
}