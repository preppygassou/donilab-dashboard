'use client'

import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { GalerieTab } from './tabs/galerie-tab'
import { ObjectifTab } from './tabs/objectif-tab'
import { TargetsTab } from './tabs/targets-tab'
import { GoalsTab } from './tabs/goals-tab'
import { ActivitiesTab } from './tabs/activities-tab'
import { ResultsTab } from './tabs/results-tab'
import { BeneficiaryTab } from './tabs/beneficiary-tab'

import { EditIcon } from 'lucide-react'
import { useProgram, useUpdateProgram } from '../../../hooks/usePrograms'
import ProgramForm from '../../ProgramForm'
import { useState } from 'react'
import ErrorAlert from '../../ErrorAlert'
import { useHubs } from '../../../hooks/useHubs'
import { usePartners } from '../../../hooks/usePartners'
import { useZones } from '../../../hooks/useZones'
import { useProgramTypes } from '../../../hooks/useProgramTypes'
import LoadingSpinner from '../../LoadingSpinner'
import Modal from '../../Modal'
import { useParams } from 'next/navigation'
import { useEditions } from '../../../hooks/useEditions'
import { useCompanies } from '../../../hooks/useEntreprise'

interface ProgramDetailsProps {
  programId: string;
}

const ProgramInfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export function ProgramDetails({ programId }: ProgramDetailsProps) {
  const { data: program, isLoading,error } = useProgram(programId);
  const updateProgram = useUpdateProgram();
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const { data: hubs, isLoading: hubsLoading } = useHubs();
  const { data: editions, isLoading: editionsLoading } = useEditions();
  const { data: companies, isLoading: companiesLoading } = useCompanies();
  const { data: partners, isLoading: partnersLoading } = usePartners();
  const { data: zones, isLoading: zonesLoading } = useZones();
  const { data: programtypes, isLoading: programtypesLoading } = useProgramTypes();
  const params = useParams<{ siteId: string; }>()
  if (isLoading||hubsLoading||partnersLoading||programtypesLoading||zonesLoading||editionsLoading||companiesLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load programs" />;


 

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="galerie">Gallery</TabsTrigger>
        <TabsTrigger value="objectif">Objectives</TabsTrigger>
        <TabsTrigger value="targets">Targets</TabsTrigger>
        <TabsTrigger value="goals">Goals</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
        <TabsTrigger value="results">Results</TabsTrigger>
        <TabsTrigger value="beneficiary">Beneficiary</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Program details and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ProgramInfoRow label="Title (EN)" value={program?.title?.en ?? 'N/A'} />
              <ProgramInfoRow label="Title (FR)" value={program?.title?.fr ?? 'N/A'} />
              <ProgramInfoRow label="Status" value={
                <span className={program?.status === 'PUBLISHED' ? 'text-green-600' : 'text-yellow-600'}>
                  {program?.status ?? 'N/A'}
                </span>
              } />
              <ProgramInfoRow label="Duration" value={`${program?.duration?.value ?? 'N/A'} ${program?.duration?.unit ?? ''}`} />
              <ProgramInfoRow label="Created" value={new Date(program?.createdAt ?? '').toLocaleDateString()} />
              <div className="pt-4">
                
                  <Button className="w-full" onClick={()=>{setEditingProgram(program)}}>
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Basic Info
                  </Button>
               
                <Modal
        open={!!editingProgram}
        onClose={() => setEditingProgram(null)}
        title="Edit Program"
      >
        <ProgramForm
         zones={zones}
         editions={editions}
         hubs={hubs}
         partners={partners}
         programtypes={programtypes}
         siteId={params.siteId}
          initialData={editingProgram}
          onSubmit={async (data) => {
            await updateProgram.mutateAsync({ id: editingProgram.id, ...data });
            setEditingProgram(null);
          }}
          onCancel={() => setEditingProgram(null)}
        />
      </Modal>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="galerie">
        <GalerieTab program={program} />
      </TabsContent>

      <TabsContent value="objectif">
        <ObjectifTab program={program} />
      </TabsContent>

      <TabsContent value="targets">
        <TargetsTab program={program} />
      </TabsContent>

      <TabsContent value="goals">
        <GoalsTab program={program} />
      </TabsContent>

      <TabsContent value="activities">
        <ActivitiesTab program={program} />
      </TabsContent>

      <TabsContent value="results">
        <ResultsTab program={program} />
      </TabsContent>
      <TabsContent value="beneficiary">
        <BeneficiaryTab editions={editions} companies={companies} program={program} />
      </TabsContent>
    </Tabs>
  )
}
