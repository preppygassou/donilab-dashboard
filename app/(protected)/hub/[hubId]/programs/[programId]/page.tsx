'use client'
import { ProgramDetails } from '../../../../../../components/views/programs/program-details'
import { useParams } from 'next/navigation'

export default function ProgramPage() {
  const params = useParams()
  const programId = params.programId as string

  return (
   
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Program Details</h2>
        <ProgramDetails programId={programId} />
      </div>

  )
}