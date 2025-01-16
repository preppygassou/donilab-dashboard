'use client'

import { Program } from '../../../../types'
import { Button } from '../../../ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../ui/card'
import { Input } from '../../../ui/input'
import { useState } from 'react'
import { useToast } from '../../../ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { api } from '../../../../services/api'
import { v4 as uuidv4 } from 'uuid'

export function ObjectifTab({ program }: { program: Program }) {
  const [newObjectif, setNewObjectif] = useState({ id: '', fr: '', en: '' })
  const [objectifType, setObjectifType] = useState<'global' | 'specifiques'>('global')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleAddObjectif = async () => {
    if (!newObjectif.fr || !newObjectif.en) return

    try {
      const updatedObjectif = {
        ...program.objectif,
        [objectifType]: [
          ...(program.objectif[objectifType] || []),
          { ...newObjectif, id: uuidv4() }
        ]
      }
      
      await api.put(`/programs/${program.id}`, {
        objectif: updatedObjectif
      })
      
      queryClient.invalidateQueries(['program', program.id])
      setNewObjectif({ id: '', fr: '', en: '' })
      toast({
        title: 'Success',
        description: 'Objective added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add objective',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveObjectif = async (type: 'global' | 'specifiques', index: number) => {
    try {
      const updatedObjectif = {
        ...program.objectif,
        [type]: program.objectif[type].filter((_, i) => i !== index)
      }
      
      await api.put(`/programs/${program.id}`, {
        objectif: updatedObjectif
      })
      
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Objective removed successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove objective',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Objective</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <select
                className="border rounded-md px-3 py-2"
                value={objectifType}
                onChange={(e) => setObjectifType(e.target.value as 'global' | 'specifiques')}
              >
                <option value="global">Global Objective</option>
                <option value="specifiques">Specific Objective</option>
              </select>
              <Input
                placeholder="French objective"
                value={newObjectif.fr}
                onChange={(e) => setNewObjectif({ ...newObjectif, fr: e.target.value })}
              />
              <Input
                placeholder="English objective"
                value={newObjectif.en}
                onChange={(e) => setNewObjectif({ ...newObjectif, en: e.target.value })}
              />
              <Button onClick={handleAddObjectif}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Global Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {program.objectif.global.map((obj, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">FR: {obj.fr}</p>
                  <p className="text-muted-foreground">EN: {obj.en}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveObjectif('global', index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specific Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {program.objectif.specifiques.map((obj, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">FR: {obj.fr}</p>
                  <p className="text-muted-foreground">EN: {obj.en}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveObjectif('specifiques', index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}