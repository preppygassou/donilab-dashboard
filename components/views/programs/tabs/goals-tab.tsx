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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'
import { useState } from 'react'
import { useToast } from '../../../ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { api } from '../../../../services/api'
import { v4 as uuidv4 } from 'uuid'

export function GoalsTab({ program }: { program: Program }) {
  const [newGoal, setNewGoal] = useState({
    id: '',
    fr: '',
    en: '',
    status: 'pending' as const
  })
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleAddGoal = async () => {
    if (!newGoal.fr || !newGoal.en) return

    try {
      const goalWithId = { ...newGoal, id: uuidv4() }
      const updatedGoals = [...(program.goals || []), goalWithId]
      await api.put(`/programs/${program.id}`, {
        goals: updatedGoals
      })
      queryClient.invalidateQueries(['program', program.id])
      setNewGoal({ id: '', fr: '', en: '', status: 'pending' })
      toast({
        title: 'Success',
        description: 'Goal added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add goal',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveGoal = async (index: number) => {
    try {
      const updatedGoals = program.goals.filter((_, i) => i !== index)
      await api.put(`/programs/${program.id}`, {
        goals: updatedGoals
      })
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Goal removed successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove goal',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateGoalStatus = async (index: number, status: string) => {
    try {
      const updatedGoals = [...program.goals]
      updatedGoals[index] = {
        ...updatedGoals[index],
        status: status as 'pending' | 'in_progress' | 'completed'
      }
      
      await api.put(`/programs/${program.id}`, {
        goals: updatedGoals
      })
      
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Goal status updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update goal status',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="French goal"
              value={newGoal.fr}
              onChange={(e) => setNewGoal({ ...newGoal, fr: e.target.value })}
            />
            <Input
              placeholder="English goal"
              value={newGoal.en}
              onChange={(e) => setNewGoal({ ...newGoal, en: e.target.value })}
            />
            <Select
              value={newGoal.status}
              onValueChange={(value) => setNewGoal({ ...newGoal, status: value as any })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </div>

          <div className="space-y-4">
            {program.goals?.map((goal, index) => (
              <div key={goal.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">FR: {goal.fr}</p>
                  <p className="text-muted-foreground">EN: {goal.en}</p>
                </div>
                <Select
                  value={goal.status}
                  onValueChange={(value) => handleUpdateGoalStatus(index, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveGoal(index)}
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