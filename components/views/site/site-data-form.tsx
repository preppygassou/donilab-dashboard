'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { useToast } from '../../ui/use-toast'
import axios from 'axios'

// Schema definitions
const contactSchema = z.object({
  title: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  description: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  contact: z.array(z.object({
    title: z.object({
      fr: z.string(),
      en: z.string(),
    }),
    image: z.object({
      url: z.string(),
    }),
    icon: z.string(),
    type: z.string(),
    description: z.object({
      fr: z.string(),
      en: z.string(),
    }),
    link: z.object({
      title: z.object({
        fr: z.string(),
        en: z.string(),
      }),
      url: z.string(),
    }),
  })),
  social: z.array(z.object({
    name: z.string(),
    url: z.string(),
    icon: z.string(),
  })),
})

const aboutSchema = z.object({
  title: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  description: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  excerpt: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  about: z.array(z.object({
    id: z.string(),
    title: z.object({
      fr: z.string(),
      en: z.string(),
    }),
    description: z.object({
      fr: z.string(),
      en: z.string(),
    }),
    featured_media: z.string(),
  })),
})

const headerSchema = z.object({
  logo: z.object({
    url: z.string().min(1, 'Required'),
    secure_url: z.string().optional(),
    public_id: z.string().optional(),
  }),
  title: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  menu: z.array(z.object({
    id: z.string(),
    icon: z.string(),
    type: z.string(),
    status: z.string(),
    title: z.object({
      fr: z.string(),
      en: z.string(),
    }),
    link: z.string(),
    slug: z.string(),
  })),
})

const footerSchema = z.object({
  logo: z.object({
    url: z.string().min(1, 'Required'),
  }),
  title: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  about: z.object({
    fr: z.string().min(1, 'Required'),
    en: z.string().min(1, 'Required'),
  }),
  menu: z.array(z.object({
    id: z.string(),
    icon: z.string(),
    type: z.string(),
    status: z.string(),
    title: z.object({
      fr: z.string(),
      en: z.string(),
    }),
    link: z.string(),
    slug: z.string(),
  })),
  information: z.array(z.object({
    id: z.string(),
    title: z.object({
      fr: z.string(),
      en: z.string(),
    }),
    type: z.string(),
    contact: z.array(z.object({
      id: z.string(),
      title: z.object({
        fr: z.string(),
        en: z.string(),
      }),
      image: z.object({
        url: z.string(),
      }),
      icon: z.string(),
      type: z.string(),
      description: z.object({
        fr: z.string(),
        en: z.string(),
      }),
      link: z.object({
        title: z.object({
          fr: z.string(),
          en: z.string(),
        }),
        url: z.string(),
      }),
    })),
  })),
})

export function SiteDataForm({ siteId,site }: { siteId: string,site:any }) {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'contact';
  });
  const { toast } = useToast()

  // Form instances
  const contactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: site?.data?.contact_page || {
      title: { fr: '', en: '' },
      description: { fr: '', en: '' },
      contact: [],
      social: [],
    },
  })

  const aboutForm = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: site?.data?.about_page || {
      title: { fr: '', en: '' },
      description: { fr: '', en: '' },
      excerpt: { fr: '', en: '' },
      about: [],
    },
  })

  const headerForm = useForm({
    resolver: zodResolver(headerSchema),
    defaultValues: site?.data?.header || {
      logo: { url: '' },
      title: { fr: '', en: '' },
      menu: [],
    },
  })

  const footerForm = useForm({
    resolver: zodResolver(footerSchema),
    defaultValues: site?.data?.footer || {
      logo: { url: '' },
      title: { fr: '', en: '' },
      about: { fr: '', en: '' },
      menu: [],
      information: [],
    },
  })

  // Submit handlers
  async function onContactSubmit(data: z.infer<typeof contactSchema>) {
    try {
      await axios.put(`/api/site-data/${siteId}/contact-page`, data)
      toast({
        title: 'Success',
        description: 'Contact page data updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update contact page data',
        variant: 'destructive',
      })
    }
  }

  async function onAboutSubmit(data: z.infer<typeof aboutSchema>) {
    try {
      await axios.put(`/api/site-data/${siteId}/about-page`, data)
      toast({
        title: 'Success',
        description: 'About page data updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update about page data',
        variant: 'destructive',
      })
    }
  }

  async function onHeaderSubmit(data: z.infer<typeof headerSchema>) {
    try {
      await axios.put(`/api/site-data/${siteId}/header`, data)
      toast({
        title: 'Success',
        description: 'Header data updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update header data',
        variant: 'destructive',
      })
    }
  }

  async function onFooterSubmit(data: z.infer<typeof footerSchema>) {
    try {
      await axios.put(`/api/site-data/${siteId}/footer`, data)
      toast({
        title: 'Success',
        description: 'Footer data updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update footer data',
        variant: 'destructive',
      })
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="contact">Contact Page</TabsTrigger>
        <TabsTrigger value="about">About Page</TabsTrigger>
        <TabsTrigger value="header">Header</TabsTrigger>
        <TabsTrigger value="footer">Footer</TabsTrigger>
      </TabsList>
      
      {/* Contact Tab */}
      <TabsContent value="contact">
        <Form {...contactForm}>
          <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                control={contactForm.control}
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
                control={contactForm.control}
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
                control={contactForm.control}
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
                
                <FormField
                control={contactForm.control}
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
              </div>
            </div>
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact List</h2>
            {contactForm.watch('contact').map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                 {/*  <FormField
                  control={contactForm.control}
                  name={`contact.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title (French)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  )}
                  /> */}
                  <FormField
                  control={contactForm.control}
                  name={`contact.${index}.title.fr`}
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
                  control={contactForm.control}
                  name={`contact.${index}.title.en`}
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
                
                <FormField
                  control={contactForm.control}
                  name={`contact.${index}.image.url`}
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                <FormField
                  control={contactForm.control}
                  name={`contact.${index}.icon`}
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                <FormField
                  control={contactForm.control}
                  name={`contact.${index}.type`}
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                  control={contactForm.control}
                  name={`contact.${index}.description.fr`}
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
                  control={contactForm.control}
                  name={`contact.${index}.description.en`}
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                  control={contactForm.control}
                  name={`contact.${index}.link.title.fr`}
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Link Title (French)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  )}
                  />

                  <FormField
                  control={contactForm.control}
                  name={`contact.${index}.link.title.en`}
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Link Title (English)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  )}
                  />
                </div>

                <FormField
                  control={contactForm.control}
                  name={`contact.${index}.link.url`}
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link URL</FormLabel>
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
                  onClick={() => {
                  const values = contactForm.getValues('contact')
                  values.splice(index, 1)
                  contactForm.setValue('contact', values)
                  }}
                >
                  Remove Contact
                </Button>
                </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const values = contactForm.getValues('contact')
                values.push({
                  id: String(values.length + 1),
                  title: { fr: '', en: '' },
                  image: { url: '' },
                  icon: '',
                  type: '',
                  description: { fr: '', en: '' },
                  link: { title: { fr: '', en: '' }, url: '' },
                })
                contactForm.setValue('contact', values)
              }}
            >
              Add Contact
            </Button>
            </div>
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">Social List</h2>
            {contactForm.watch('social').map((_, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                <FormField
                  control={contactForm.control}
                  name={`social.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name={`social.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name={`social.${index}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Icon</FormLabel>
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
                  onClick={() => {
                    const values = contactForm.getValues('social')
                    values.splice(index, 1)
                    contactForm.setValue('social', values)
                  }}
                  className="col-span-2"
                >
                  Remove Social
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const values = contactForm.getValues('social')
                values.push({id: String(values.length + 1), name: '', url: '', icon: '' })
                contactForm.setValue('social', values)
              }}
            >
              Add Social
            </Button>
            </div>
           
            <Button type="submit">Save Contact Data</Button>
          </form>
        </Form>
      </TabsContent>

      {/* About Tab */}
      <TabsContent value="about">
        <Form {...aboutForm}>
          <form onSubmit={aboutForm.handleSubmit(onAboutSubmit)} className="space-y-8">
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">About Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={aboutForm.control}
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
                control={aboutForm.control}
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
                control={aboutForm.control}
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
              
              <FormField
                control={aboutForm.control}
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
                control={aboutForm.control}
                name="excerpt.fr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt (French)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={aboutForm.control}
                name="excerpt.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt (English)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
            

            {/* About Items */}
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">About list</h2>
            <div className="space-y-4">
              {aboutForm.watch('about').map((_, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                  <FormField
                  control={aboutForm.control}
                  name={`about.${index}.id`}
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
                  <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={aboutForm.control}
                    name={`about.${index}.title.fr`}
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
                    control={aboutForm.control}
                    name={`about.${index}.title.en`}
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={aboutForm.control}
                    name={`about.${index}.description.fr`}
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
                    control={aboutForm.control}
                    name={`about.${index}.description.en`}
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

                  <FormField
                    control={aboutForm.control}
                    name={`about.${index}.featured_media`}
                    render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Featured Media URL</FormLabel>
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
                  onClick={() => {
                    const values = aboutForm.getValues('about')
                    values.splice(index, 1)
                    aboutForm.setValue('about', values)
                  }}
                  className="col-span-2"
                  >
                  Remove Item
                  </Button>
                </div>
              ))}
              <Button
              type="button"
              variant="outline"
              onClick={() => {
                const values = aboutForm.getValues('about')
                values.push({
                  id: String(values.length + 1),
                  title: { fr: '', en: '' },
                  description: { fr: '', en: '' },
                  featured_media: '',
                })
                aboutForm.setValue('about', values)
              }}
            >
              Add About Item
            </Button>
            
            </div>
            </div>
            
            
            <Button type="submit">Save About Data</Button>
          </form>
        </Form>
      </TabsContent>

      {/* Header Tab */}
      <TabsContent value="header">
        <Form {...headerForm}>
          <form onSubmit={headerForm.handleSubmit(onHeaderSubmit)} className="space-y-8">
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">Header Information</h2>
            <div className="grid grid-cols-2 gap-4">
            <FormField
                control={headerForm.control}
                name="logo.url"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={headerForm.control}
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
                control={headerForm.control}
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
            </div>
              
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
            <h2 className="text-xl font-semibold">Header Menu</h2>
            <div className="grid grid-cols-2 gap-4">

              {headerForm.watch('menu').map((_, index) => (
                <div key={index} className=" p-4 border rounded-lg space-y-4">
                  <FormField
                  control={headerForm.control}
                  name={`menu.${index}.id`}
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
                    <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={headerForm.control}
                      name={`menu.${index}.title.fr`}
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
                      control={headerForm.control}
                      name={`menu.${index}.title.en`}
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
                    
                    <FormField
                    control={headerForm.control}
                    name={`menu.${index}.icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    <FormField
                    control={headerForm.control}
                    name={`menu.${index}.status`}
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select {...field} className="form-select">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                    )}
                    />

                    <FormField
                    control={headerForm.control}
                    name={`menu.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={headerForm.control}
                    name={`menu.${index}.link`}
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
                  
                  <FormField
                    control={headerForm.control}
                    name={`menu.${index}.slug`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
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
                    onClick={() => {
                      const values = headerForm.getValues('menu')
                      values.splice(index, 1)
                      headerForm.setValue('menu', values)
                    }}
                  >
                    Remove Menu Item
                  </Button>
                </div>
              ))}
              </div>
              <Button
              type="button"
              variant="outline"
              onClick={() => {
                const values = headerForm.getValues('menu')
                values.push({
                  id: String(values.length + 1),
                  icon: '',
                  type: 'link',
                  status: 'active',
                  title: { fr: '', en: '' },
                  link: '',
                  slug: '',
                })
                headerForm.setValue('menu', values)
              }}
            >
              Add Menu Item
            </Button>
            
            </div>
            
            
            <Button type="submit">Save Header Data</Button>
          </form>
        </Form>
      </TabsContent>

      {/* Footer Tab */}
      <TabsContent value="footer">
        <Form {...footerForm}>
          <form onSubmit={footerForm.handleSubmit(onFooterSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              
              <FormField
                control={footerForm.control}
                name="logo.url"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={footerForm.control}
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
                control={footerForm.control}
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
                control={footerForm.control}
                name="about.fr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About (French)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={footerForm.control}
                name="about.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About (English)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer Menu Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Menu Items</h3>
              {footerForm.watch('menu').map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                  control={headerForm.control}
                  name={`menu.${index}.id`}
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
                  <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={footerForm.control}
                    name={`menu.${index}.title.fr`}
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
                    control={footerForm.control}
                    name={`menu.${index}.title.en`}
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
                  <FormField
                    control={headerForm.control}
                    name={`menu.${index}.icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                  <FormField
                    control={headerForm.control}
                    name={`menu.${index}.status`}
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select {...field} className="form-select">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                    )}
                    />

                    <FormField
                    control={headerForm.control}
                    name={`menu.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                  control={footerForm.control}
                  name={`menu.${index}.link`}
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
                  <FormField
                    control={headerForm.control}
                    name={`menu.${index}.slug`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
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
                  onClick={() => {
                    const values = footerForm.getValues('menu')
                    values.splice(index, 1)
                    footerForm.setValue('menu', values)
                  }}
                  >
                  Remove Menu Item
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const values = footerForm.getValues('menu')
                  values.push({
                    id: String(values.length + 1),
                    icon: '',
                    type: 'link',
                    status: 'active',
                    title: { fr: '', en: '' },
                    link: '',
                    slug: '',
                  })
                  footerForm.setValue('menu', values)
                }}
              >
                Add Menu Item
              </Button>
            </div>

            {/* Footer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Information</h3>
              {footerForm.watch('information').map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                   <FormField
                  control={headerForm.control}
                  name={`information.${index}.id`}
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
                    control={footerForm.control}
                    name={`information.${index}.title.fr`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title (French)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={footerForm.control}
                    name={`information.${index}.title.en`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title (English)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={footerForm.control}
                    name={`information.${index}.title.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Type (English)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                 <div className="space-y-4">
                 <h3 className="text-lg font-semibold">Contact list</h3>
                 {footerForm.watch(`information.${index}.contact`).map((_, contactIndex) => (
                    <div key={contactIndex} className="space-y-4 p-4 border rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={footerForm.control}
                          name={`information.${index}.contact.${contactIndex}.id`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID</FormLabel>
                              <FormControl>
                                <Input {...field} value={String(contactIndex + 1)} readOnly />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={footerForm.control}
                          name={`information.${index}.contact.${contactIndex}.title.fr`}
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
                          control={footerForm.control}
                          name={`information.${index}.contact.${contactIndex}.title.en`}
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
                      
                      <FormField
                        control={footerForm.control}
                        name={`information.${index}.contact.${contactIndex}.image.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={footerForm.control}
                        name={`information.${index}.contact.${contactIndex}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={footerForm.control}
                        name={`information.${index}.contact.${contactIndex}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={footerForm.control}
                          name={`information.${index}.contact.${contactIndex}.description.fr`}
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
                          control={footerForm.control}
                          name={`information.${index}.contact.${contactIndex}.description.en`}
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
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={footerForm.control}
                          name={`information.${index}.contact.${contactIndex}.link.title.fr`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link Title (French)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={footerForm.control}
                          name={`information.${index}.contact.${contactIndex}.link.title.en`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link Title (English)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={footerForm.control}
                        name={`information.${index}.contact.${contactIndex}.link.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link URL</FormLabel>
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
                          onClick={() => {
                          const values = footerForm.getValues(`information.${index}.contact`)
                          values.splice(contactIndex, 1)
                          footerForm.setValue(`information.${index}.contact`, values)
                          }}
                        >
                          Remove Contact
                        </Button>
                    </div>
                  ))}
 <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                          const values = footerForm.getValues(`information.${index}.contact`)
                          values.push({
                            id: String(values.length + 1),
                            title: { fr: '', en: '' },
                            image: { url: '' },
                            icon: '',
                            type: '',
                            description: { fr: '', en: '' },
                            link: { title: { fr: '', en: '' }, url: '' },
                          })
                          footerForm.setValue(`information.${index}.contact`, values)
                          }}
                        >
                          Add Contact
                        </Button>

                 </div>
                  
                 <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const values = footerForm.getValues('information')
                      values.splice(index, 1)
                      footerForm.setValue('information', values)
                    }}
                  >
                    Remove Information Section
              </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const values = footerForm.getValues('information')
                  values.push({
                    id: String(values.length + 1),
                    title: { fr: '', en: '' },
                    type: 'contact_info',
                    contact: [],
                  })
                  footerForm.setValue('information', values)
                }}
              >
                Add Information Section
              </Button>
            </div>
            
            <Button type="submit">Save Footer Data</Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}