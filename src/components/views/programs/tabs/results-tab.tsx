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
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { api } from '@/services/api'

export function ResultsTab({ program }: { program: Program }) {
  const [newResult, setNewResult] = useState({
    fr: '',
    en: '',
    indicator: {
      fr: '',
      en: ''
    },
    achieved: 0,
    target: 0
  })
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleAddResult = async () => {
    if (!newResult.fr || !newResult.en || !newResult.indicator.fr || !newResult.indicator.en) return

    try {
      const updatedResults = [...(program.results || []), newResult]
      await api.patch(`/programs/${program.id}`, {
        results: updatedResults
      })
      queryClient.invalidateQueries(['program', program.id])
      setNewResult({
        fr: '',
        en: '',
        indicator: {
          fr: '',
          en: ''
        },
        achieved: 0,
        target: 0
      })
      toast({
        title: 'Success',
        description: 'Result added successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add result',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveResult = async (index: number) => {
    try {
      const updatedResults = program.results.filter((_, i) => i !== index)
      await api.patch(`/programs/${program.id}`, {
        results: updatedResults
      })
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Result removed successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove result',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateResult = async (index: number, field: string, value: number) => {
    try {
      const updatedResults = [...program.results]
      updatedResults[index] = {
        ...updatedResults[index],
        [field]: value
      }
      
      await api.patch(`/programs/${program.id}`, {
        results: updatedResults
      })
      
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Result updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update result',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="French result"
              value={newResult.fr}
              onChange={(e) => setNewResult({ ...newResult, fr: e.target.value })}
            />
            <Input
              placeholder="English result"
              value={newResult.en}
              onChange={(e) => setNewResult({ ...newResult, en: e.target.value })}
            />
            <Input
              placeholder="French indicator"
              value={newResult.indicator.fr}
              onChange={(e) => setNewResult({
                ...newResult,
                indicator: { ...newResult.indicator, fr: e.target.value }
              })}
            />
            <Input
              placeholder="English indicator"
              value={newResult.indicator.en}
              onChange={(e) => setNewResult({
                ...newResult,
                indicator: { ...newResult.indicator, en: e.target.value }
              })}
            />
            <Input
              type="number"
              placeholder="Target value"
              value={newResult.target}
              onChange={(e) => setNewResult({
                ...newResult,
                target: parseInt(e.target.value)
              })}
            />
            <Input
              type="number"
              placeholder="Achieved value"
              value={newResult.achieved}
              onChange={(e) => setNewResult({
                ...newResult,
                achieved: parseInt(e.target.value)
              })}
            />
            <Button onClick={handleAddResult} className="col-span-2">Add Result</Button>
          </div>

          <div className="space-y-4">
            {program.results?.map((result, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="font-medium">Result:</p>
                      <p>FR: {result.fr}</p>
                      <p>EN: {result.en}</p>
                    </div>
                    <div>
                      <p className="font-medium">Indicator:</p>
                      <p>FR: {result.indicator.fr}</p>
                      <p>EN: {result.indicator.en}</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveResult(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Target</p>
                    <Input
                      type="number"
                      value={result.target}
                      onChange={(e) => handleUpdateResult(index, 'target', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Achieved</p>
                    <Input
                      type="number"
                      value={result.achieved}
                      onChange={(e) => handleUpdateResult(index, 'achieved', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary-600">
                        {Math.round((result.achieved / result.target) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                    <div
                      style={{ width: `${(result.achieved / result.target) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}