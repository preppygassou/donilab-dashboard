"use client"

import { useParams } from 'next/navigation';
import { SiteDetails } from './site/site-details';

export default function SiteDetailsPage() {
  
  const params = useParams<{ siteId: string; }>()
  const { siteId:id } = params;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
    <h2 className="text-3xl font-bold tracking-tight">Site Details</h2>
    <SiteDetails siteId={id} />
  </div>
  );
}