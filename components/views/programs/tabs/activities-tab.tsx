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
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { api } from '../../../../services/api'
import { v4 as uuidv4 } from 'uuid'

export function ActivitiesTab({ program }: { program: Program }) {
  const [newActivity, setNewActivity] = useState({
    id: '',
    fr: '',
    en: '',
    startDate: '',
    endDate: '',
    status: 'planned' as const
  })
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleAddActivity = async () => {
    if (!newActivity.fr || !newActivity.en || !newActivity.startDate || !newActivity.endDate) return

    try {
      const activityWithId = { ...newActivity, id: uuidv4() }
      const updatedActivities = [...(program.activities || []), activityWithId]
      await api.put(`/programs/${program.id}`, {
        activities: updatedActivities
      })
      queryClient.invalidateQueries(['program', program.id])
      setNewActivity({
        id: '',
        fr: '',
        en: '',
        startDate: '',
        endDate: '',
        status: 'planned'
      })
      toast({
        title: 'Success',
        description: 'Activity added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add activity',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveActivity = async (index: number) => {
    try {
      const updatedActivities = program.activities.filter((_, i) => i !== index)
      await api.put(`/programs/${program.id}`, {
        activities: updatedActivities
      })
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Activity removed successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove activity',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateActivityStatus = async (index: number, status: string) => {
    try {
      const updatedActivities = [...program.activities]
      updatedActivities[index] = {
        ...updatedActivities[index],
        status: status as 'planned' | 'in_progress' | 'completed' | 'cancelled'
      }
      
      await api.put(`/programs/${program.id}`, {
        activities: updatedActivities
      })
      
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Activity status updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update activity status',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="French activity"
              value={newActivity.fr}
              onChange={(e) => setNewActivity({ ...newActivity, fr: e.target.value })}
            />
            <Input
              placeholder="English activity"
              value={newActivity.en}
              onChange={(e) => setNewActivity({ ...newActivity, en: e.target.value })}
            />
            <Input
              type="date"
              placeholder="Start date"
              value={newActivity.startDate}
              onChange={(e) => setNewActivity({ ...newActivity, startDate: e.target.value })}
            />
            <Input
              type="date"
              placeholder="End date"
              value={newActivity.endDate}
              onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
            />
            <Select
              value={newActivity.status}
              onValueChange={(value) => setNewActivity({ ...newActivity, status: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddActivity}>Add Activity</Button>
          </div>

          <div className="space-y-4">
            {program.activities?.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">FR: {activity.fr}</p>
                  <p className="text-muted-foreground">EN: {activity.en}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.startDate).toLocaleDateString()} - 
                    {new Date(activity.endDate).toLocaleDateString()}
                  </p>
                </div>
                <Select
                  value={activity.status}
                  onValueChange={(value) => handleUpdateActivityStatus(index, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveActivity(index)}
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