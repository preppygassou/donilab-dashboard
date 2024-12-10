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

export function GalerieTab({ program }: { program: Program }) {
  const [newImageUrl, setNewImageUrl] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleAddImage = async () => {
    if (!newImageUrl) return

    try {
      const updatedGalerie = [...(program.galerie || []), { url: newImageUrl }]
      await api.patch(`/programs/${program.id}`, {
        galerie: updatedGalerie
      })
      queryClient.invalidateQueries(['program', program.id])
      setNewImageUrl('')
      toast({
        title: 'Success',
        description: 'Image added to gallery',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add image',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveImage = async (index: number) => {
    try {
      const updatedGalerie = program.galerie.filter((_, i) => i !== index)
      await api.patch(`/programs/${program.id}`, {
        galerie: updatedGalerie
      })
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Image removed from gallery',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove image',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <Button onClick={handleAddImage}>Add Image</Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {program.galerie?.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
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