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

export function GalerieTab({ program }: { program: Program }) {
  const [newImage, setNewImage] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleAddImage = async () => {
    if (!newImage) return

    try {
      const updatedGalerie = [...(program.galerie || []), { url: newImage, id: uuidv4() }]
      await api.put(`/programs/${program.id}`, {
        galerie: updatedGalerie
      })
      queryClient.invalidateQueries(['program', program.id])
      setNewImage('')
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

  const handleRemoveImage = async (id: string) => {
    try {
      const updatedGalerie = program.galerie.filter(image => image.id !== id)
      await api.put(`/programs/${program.id}`, {
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
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <Button onClick={handleAddImage}>Add Image</Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {program.galerie?.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={`Gallery image`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(image.id)}
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