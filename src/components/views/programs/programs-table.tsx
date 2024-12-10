'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { EditIcon, TrashIcon } from 'lucide-react'
import { EditProgramDialog } from './edit-program-dialog'
import { useToast } from '@/components/ui/use-toast'
import { Program } from '@/types'

export function ProgramsTable() {
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data } = await axios.get('/api/programs')
      return data
    }
  })

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/programs/${id}`)
      queryClient.invalidateQueries(['programs'])
      toast({
        title: 'Success',
        description: 'Program deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete program',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title (EN)</TableHead>
              <TableHead>Title (FR)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs?.map((program) => (
              <TableRow key={program.id}>
                <TableCell>{program.title.en}</TableCell>
                <TableCell>{program.title.fr}</TableCell>
                <TableCell>{program.status}</TableCell>
                <TableCell>
                  {program.duration.value} {program.duration.unit}
                </TableCell>
                <TableCell>{program.programTypeId}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingProgram(program)}
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(program.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {editingProgram && (
        <EditProgramDialog
          program={editingProgram}
          open={!!editingProgram}
          onOpenChange={(open) => !open && setEditingProgram(null)}
        />
      )}
    </>
  )
}