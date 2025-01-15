'use client'

import { Program } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { api } from '@/services/api'
import { v4 as uuidv4 } from 'uuid'

export function TargetsTab({ program }: { program: Program }) {
  const [newTarget, setNewTarget] = useState({
    id: '',
    fr: '',
    en: '',
    value: 0
  })
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleAddTarget = async () => {
    if (!newTarget.fr || !newTarget.en) return

    try {
      const targetWithId = { ...newTarget, id: uuidv4() }
      const updatedTargets = [...(program.targets || []), targetWithId]
      await api.put(`/programs/${program.id}`, {
        targets: updatedTargets
      })
      queryClient.invalidateQueries(['program', program.id])
      setNewTarget({ id: '', fr: '', en: '', value: 0 })
      toast({
        title: 'Success',
        description: 'Target added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add target',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveTarget = async (index: number) => {
    try {
      const updatedTargets = program.targets.filter((_, i) => i !== index)
      await api.put(`/programs/${program.id}`, {
        targets: updatedTargets
      })
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Target removed successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove target',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Targets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="French target"
              value={newTarget.fr}
              onChange={(e) => setNewTarget({ ...newTarget, fr: e.target.value })}
            />
            <Input
              placeholder="English target"
              value={newTarget.en}
              onChange={(e) => setNewTarget({ ...newTarget, en: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Target value"
              value={newTarget.value}
              onChange={(e) => setNewTarget({ ...newTarget, value: parseInt(e.target.value) })}
            />
            <Button onClick={handleAddTarget}>Add Target</Button>
          </div>

          <div className="space-y-4">
            {program.targets?.map((target, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">FR: {target.fr}</p>
                  <p className="text-muted-foreground">EN: {target.en}</p>
                  <p className="text-sm text-muted-foreground">Value: {target.value}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveTarget(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}