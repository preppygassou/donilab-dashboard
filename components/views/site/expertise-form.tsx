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
import axios from 'axios'

const expertiseSchema = z.object({
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
  link: z.string(),
})

const expertisesSchema=z.object({expertises:z.array(expertiseSchema)})

type ExpertiseFormValues = z.infer<typeof expertiseSchema>

function ExpertiseItemForm({ control, index, remove }: { control: any, index: number, remove: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">

            <FormField
              control={control}
              name={`expertises.${index}.link`}
              render={({ field }) => (
          <FormItem>
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
            <div className="col-span-2 grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`expertises.${index}.title.fr`}
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
          name={`expertises.${index}.title.en`}
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
            </div>
            
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`expertises.${index}.description.fr`}
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
                name={`expertises.${index}.description.en`}
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
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`expertises.${index}.icon.url`}
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
                name={`expertises.${index}.iconHover.url`}
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
            </div>
            
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

export function ExpertiseForm({ siteId,site }: { siteId: string ,site:any}) {
  const { toast } = useToast()
  
  const form = useForm<{expertises:ExpertiseFormValues[]}>({
    resolver: zodResolver(expertisesSchema),
    defaultValues: { expertises: site?.expertise||[] },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'expertises',
  })

  console.log(form.watch())

  form.handleSubmit(onSubmit, (errors) => {
    console.log("submit errors", errors)
  })


  async function onSubmit(data: {expertises:ExpertiseFormValues[]}) {
    try {
      await axios.put(`/api/site-data/${siteId}/expertise`, data.expertises)
      toast({
        title: 'Success',
        description: 'Expertise updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update expertise',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <ExpertiseItemForm
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
            link: '',
          })}
        >
          Add Expertise
        </Button>
        </div>
        
        
        
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  )
}