'use client'

import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/services/api'

const galerieSchema = z.object({ galerie :z.array(z.object({
  id: z.string(),
  url: z.string()/* .url('Must be a valid URL') */
}))})

const summarySchema = z.object({
  title: z.object({
    en: z.string().min(1, 'Required'),
    fr: z.string().min(1, 'Required'),
  }),
  description: z.object({
    en: z.string().min(1, 'Required'),
    fr: z.string().min(1, 'Required'),
  }),
})
const descriptionTeamSchema = z.object({
  en: z.string().min(1, 'Required'),
  fr: z.string().min(1, 'Required'),
})
const descriptionProgramSchema = z.object({
  en: z.string().min(1, 'Required'),
  fr: z.string().min(1, 'Required'),
})
const descriptionProgramPartnerSchema = z.object({
  en: z.string().min(1, 'Required'),
  fr: z.string().min(1, 'Required'),
})



const specificitiesSchema =z.object({
  specificities:z.array(z.object({
    id: z.string(),
    title: z.object({
      en: z.string().min(1, 'Required'),
      fr: z.string().min(1, 'Required'),
    }),
    description: z.object({
      en: z.string().min(1, 'Required'),
      fr: z.string().min(1, 'Required'),
    }),
    image: z.object({
      en: z.string().url('Must be a valid URL'),
      fr: z.string().url('Must be a valid URL'),
    }),
  }))
})

const servicesSchema =z.object({ services :z.array(z.object({
  id: z.string(),
  icon: z.object({
    url: z.string()/* .url('Must be a valid URL'), */
  }),
  iconHover: z.object({
    url: z.string()/* .url('Must be a valid URL'), */
  }),
  title: z.object({
    en: z.string().min(1, 'Required'),
    fr: z.string().min(1, 'Required'),
  }),
  description: z.object({
    en: z.string().min(1, 'Required'),
    fr: z.string().min(1, 'Required'),
  }),
}))})

function FormFieldArray({ control, name, renderItem }) {
  const { fields, append, remove } = useFieldArray({ control, name })
  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4">
          {renderItem({ field, index })}
          <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append({ id: String(fields.length + 1) })}>Add Item</Button>
    </div>
  )
}

export function HubDataForm({ hubId,hub }: { hubId: string,hub?:any }) {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'galerie';
  });
  const { toast } = useToast()

  const galerieForm = useForm({
    resolver: zodResolver(galerieSchema),
    defaultValues: {galerie:hub?.galerie||[]},
  })

  const summaryForm = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues:hub?.summary|| {
      title: { en: '', fr: '' },
      description: { en: '', fr: '' },
    },
  })

  const descriptionTeamForm = useForm({
    resolver: zodResolver(descriptionTeamSchema),
    defaultValues:hub?.description_team|| { en: '', fr: '' }
  })
  const descriptionProgramForm = useForm({
    resolver: zodResolver(descriptionProgramSchema),
    defaultValues:hub?.description_program_hub|| { en: '', fr: '' }
  })
  const descriptionProgramPartnerForm = useForm({
    resolver: zodResolver(descriptionProgramPartnerSchema),
    defaultValues:hub?.description_program_partner|| { en: '', fr: '' }
  })

  const specificitiesForm = useForm({
    resolver: zodResolver(specificitiesSchema),
    defaultValues: { specificities: hub?.specificities || [] },
  })

  const servicesForm = useForm({
    resolver: zodResolver(servicesSchema),
    defaultValues:{services: hub?.services|| []},
  })

const onError=(errors)=>{
  console.log("Validations errors",errors)
}

  async function onSubmit(form, data, endpoint) {
    console.log('Form Data:', data)

    try {
      await api.put(`/hub-data/${hubId}/${endpoint}`, data)
      toast({
        title: 'Success',
        description: `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} updated successfully`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to update ${endpoint}`,
        variant: 'destructive',
      })
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="galerie">Gallery</TabsTrigger>
        <TabsTrigger value="description_team">Team description</TabsTrigger>
        <TabsTrigger value="description_program_hub">Program description</TabsTrigger>
        <TabsTrigger value="description_program_partner">Program in partner description</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="specificities">Specificities</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>

      <TabsContent value="galerie">
        <Form {...galerieForm}>
          <form onSubmit={galerieForm.handleSubmit(data => onSubmit(galerieForm, data.galerie, 'galerie'))} className="space-y-8">
            <FormFieldArray
              control={galerieForm.control}
              name="galerie"
              renderItem={({ _, index }: { field: any, index: number }) => (
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  {/* <FormField
                    control={galerieForm.control}
                    name={`galerie.${index}.id`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>ID</FormLabel>
                        <FormControl>
                          <Input {...field} value={String(index + 1)} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={galerieForm.control}
                    name={`galerie.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

              )}
            />
            <Button type="submit">Save Gallery</Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="description_team">
        <Form {...descriptionTeamForm}>
          <form onSubmit={descriptionTeamForm.handleSubmit(data => onSubmit(descriptionTeamForm, data, 'description_team'))} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={descriptionTeamForm.control}
                name="en"
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
                control={descriptionTeamForm.control}
                name="fr"
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
              
            </div>
            <Button type="submit">Save Team description </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="description_program_hub">
        <Form {...descriptionProgramForm}>
          <form onSubmit={descriptionProgramForm.handleSubmit(data => onSubmit(descriptionProgramForm, data, 'description_program_hub'))} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={descriptionProgramForm.control}
                name="en"
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
                control={descriptionProgramForm.control}
                name="fr"
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
              
            </div>
            <Button type="submit">Save Program description </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="description_program_partner">
        <Form {...descriptionProgramPartnerForm}>
          <form onSubmit={descriptionProgramPartnerForm.handleSubmit(data => onSubmit(descriptionProgramPartnerForm, data, 'description_program_partner'))} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={descriptionProgramPartnerForm.control}
                name="en"
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
                control={descriptionProgramPartnerForm.control}
                name="fr"
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
              
            </div>
            <Button type="submit">Save description Program Partner </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="summary">
        <Form {...summaryForm}>
          <form onSubmit={summaryForm.handleSubmit(data => onSubmit(summaryForm, data, 'summary'))} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={summaryForm.control}
                name="title.en"
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
                control={summaryForm.control}
                name="title.fr"
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
                control={summaryForm.control}
                name="description.en"
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
                control={summaryForm.control}
                name="description.fr"
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
            </div>
            <Button type="submit">Save Summary</Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="specificities">
        <Form {...specificitiesForm}>
          <form onSubmit={specificitiesForm.handleSubmit(data => onSubmit(specificitiesForm, data.specificities, 'specificities'), onError)} className="space-y-8">
            <FormFieldArray
              control={specificitiesForm.control}
              name="specificities"
              renderItem={({ _, index }) => (
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <FormField
              control={specificitiesForm.control}
              name={`specificities.${index}.title.en`}
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
              control={specificitiesForm.control}
              name={`specificities.${index}.title.fr`}
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
              control={specificitiesForm.control}
              name={`specificities.${index}.description.en`}
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
              control={specificitiesForm.control}
              name={`specificities.${index}.description.fr`}
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
              control={specificitiesForm.control}
              name={`specificities.${index}.image.en`}
              render={({ field }) => (
                <FormItem>
            <FormLabel>Image URL (English)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={specificitiesForm.control}
              name={`specificities.${index}.image.fr`}
              render={({ field }) => (
                <FormItem>
            <FormLabel>Image URL (French)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
                </FormItem>
              )}
            />
          </div>
              )}
            />
            <Button type="submit">Save Specificities</Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="services">
        <Form {...servicesForm}>
          <form onSubmit={servicesForm.handleSubmit(data => onSubmit(servicesForm, data.services, 'services'))} className="space-y-8">
            <FormFieldArray
              control={servicesForm.control}
              name="services"
              renderItem={({ _, index }) => (
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <FormField
                    control={servicesForm.control}
                    name={`services.${index}.id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID</FormLabel>
                        <FormControl>
                          <Input {...field} value={String(index + 1)} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servicesForm.control}
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
                    control={servicesForm.control}
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
                    control={servicesForm.control}
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
                    control={servicesForm.control}
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
                    control={servicesForm.control}
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
                    control={servicesForm.control}
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
                </div>
              )}
            />
            <Button type="submit">Save Services</Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}
