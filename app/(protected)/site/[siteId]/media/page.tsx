"use client"
import ErrorAlert from '../../../../../components/ErrorAlert'
import BlurPage from '../../../../../components/global/blur-page'
import LoadingSpinner from '../../../../../components/LoadingSpinner'
import MediaComponent from '../../../../../components/media'
import { useMediaSite } from '../../../../../hooks/useMedia'
import React from 'react'

type Props = {
  params: { siteId: string }
}

const MediaPage = ({ params }: Props) => {
  const { data, isLoading: Loading,error } = useMediaSite(params.siteId)
 
  if (Loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load media" />;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <MediaComponent
        data={data}
        siteId={params.siteId}
      />
   </div>
  )
}

export default MediaPage