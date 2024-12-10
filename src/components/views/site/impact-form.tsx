'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { api } from '@/services/api'

const impactSchema = z.object({
  id: z.string(),
  icon: z.object({
    url: z.string(),
  }),
  total: z.string().min(1, 'Required'),
  description: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
})
const impactsSchema=z.object({impacts:z.array(impactSchema)})

type ImpactFormValues = z.infer<typeof impactSchema>

export function ImpactForm({ siteId,site }: { siteId: string,site:any }) {
  const { toast } = useToast()


  
  const form = useForm<{impacts: ImpactFormValues[]}>({
    resolver: zodResolver(impactsSchema),
    defaultValues: { impacts:site?.impact|| [] },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'impacts',
  })
  console.log(form.watch())

  form.handleSubmit(onSubmit, (errors) => {
    console.log("submit errors", errors)
  })

  async function onSubmit(data: { impacts: ImpactFormValues[] }) {
    try {
      await api.put(`/site-data/${siteId}/impact`, data.impacts)
      toast({
        title: 'Success',
        description: 'Impact metrics updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update impact metrics',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
              <FormField
                control={form.control}
                name={`impacts.${index}.icon.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/assets/svg/icon-14.svg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`impacts.${index}.total`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="350" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`impacts.${index}.description.fr`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (French)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Entreprises incubées et accélérées depuis 2015" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`impacts.${index}.description.en`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (English)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Companies incubated and accelerated since 2015" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="col-span-2"
              >
                Remove Impact Metric
              </Button>
            </div>
          ))}
          <Button
          type="button"
          variant="outline"
          onClick={() => append({
            id: String(fields.length + 1),
            icon: { url: '' },
            total: '',
            description: { fr: '', en: '' },
          })}
        >
          Add Impact Metric
        </Button>
        </div>
        
        
        
        <Button type="submit">Save Impact Metrics</Button>
      </form>
    </Form>
  )
}
