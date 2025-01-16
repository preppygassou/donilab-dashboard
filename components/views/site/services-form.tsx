'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '../../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import { useToast } from '../../ui/use-toast'
import { api } from '../../../services/api'

const serviceSchema = z.object({
  id: z.string(),
  icon: z.object({
    url: z.string(),
  }),
  iconHover: z.object({
    url: z.string(),
  }),
  title: z.object({
    fr: z.string(),
    en: z.string(),
  }),
  description: z.object({
    fr: z.string(),
    en: z.string(),
  }),
})

const servicesSchema = z.object({services:z.array(serviceSchema)})

type ServiceFormValues = z.infer<typeof serviceSchema>

function ServiceFields({ control, index, remove }: { control: any, index: number, remove: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
      <FormField
        control={control}
        name={`services.${index}.title.fr`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title (French)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`services.${index}.title.en`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title (English)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`services.${index}.description.fr`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (French)</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`services.${index}.description.en`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (English)</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`services.${index}.icon.url`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`services.${index}.iconHover.url`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon Hover URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button
        type="button"
        variant="destructive"
        onClick={remove}
      >
        Remove
      </Button>
    </div>
  )
}

export function ServicesForm({ siteId,site }: { siteId: string,site:any }) {
  const { toast } = useToast()
  
  const form = useForm<{ services: ServiceFormValues[] }>({
    resolver: zodResolver(servicesSchema),
    defaultValues: { services:site?.services|| [] },
  })
  console.log(form.watch())
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'services',
  })
  form.handleSubmit(onSubmit, (errors) => {
    console.log("submit errors", errors)
  })
  async function onSubmit(data: { services: ServiceFormValues[] }) {
    console.log("values",data.services)
    try {
      await api.put(`/site-data/${siteId}/services`, data.services)
      toast({
        title: 'Success',
        description: 'Services updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update services',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <ServiceFields
              key={field.id}
              control={form.control}
              index={index}
              remove={() => remove(index)}
            />
          ))}
          <Button
          type="button"
          variant="outline"
          onClick={() => append({
            id: String(fields.length + 1),
            icon: { url: '' },
            iconHover: { url: '' },
            title: { fr: '', en: '' },
            description: { fr: '', en: '' },
          })}
        >
          Add Service
        </Button>
        </div> 
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  )
}