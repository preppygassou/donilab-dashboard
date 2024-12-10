'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Program } from '@/types'

const formSchema = z.object({
  title: z.object({
    en: z.string().min(1, 'Required'),
    fr: z.string().min(1, 'Required'),
  }),
  description: z.object({
    en: z.string().min(1, 'Required'),
    fr: z.string().min(1, 'Required'),
  }),
  logo: z.object({
    url: z.string().url('Must be a valid URL'),
  }),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  duration: z.object({
    value: z.number().min(1, 'Must be greater than 0'),
    unit: z.enum(['days', 'weeks', 'months', 'years']),
  }),
  programTypeId: z.string().uuid('Invalid program type ID'),
  zones: z.array(z.string().uuid('Invalid zone ID')),
})

interface EditProgramDialogProps {
  program: Program
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProgramDialog({
  program,
  open,
  onOpenChange,
}: EditProgramDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const { data: programTypes } = useQuery({
    queryKey: ['program-types'],
    queryFn: async () => {
      const { data } = await axios.get('/api/program-types')
      return data
    }
  })

  const { data: zones } = useQuery({
    queryKey: ['zones'],
    queryFn: async () => {
      const { data } = await axios.get('/api/zones')
      return data
    }
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: program.title,
      description: program.description,
      logo: program.logo,
      status: program.status,
      duration: program.duration,
      programTypeId: program.programTypeId,
      zones: program.zones || [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/programs/${program.id}`, values)
      queryClient.invalidateQueries(['programs'])
      toast({
        title: 'Success',
        description: 'Program updated successfully',
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update program',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Program</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Same form fields as AddProgramDialog */}
              {/* ... Copy all form fields from AddProgramDialog ... */}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}