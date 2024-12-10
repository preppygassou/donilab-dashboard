'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { EditIcon } from 'lucide-react'
import { useHub } from '@/hooks/useHubs'
import ErrorAlert from '@/components/ErrorAlert'
import LoadingSpinner from '@/components/LoadingSpinner'

export function HubDetails({ hubId }: { hubId: string }) {
  
  const { data: hub, isLoading, error } = useHub(hubId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Hub not found" />;

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="specificities">Specificities</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Hub details and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Title (EN):</span>
                <span>{hub.title.en}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Title (FR):</span>
                <span>{hub.title.fr}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className={`${
                  hub.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {hub.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Created:</span>
                <span>{new Date(hub.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="pt-4">
                <Link href={`/hub/${hubId}/edit`}>
                  <Button className="w-full">
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Basic Info
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage hub content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/hub/${hubId}/data`}>
                <Button variant="outline" className="w-full mb-2">
                  Manage Hub Data
                </Button>
              </Link>
              <Link href={`/hub/${hubId}/programs`}>
                <Button variant="outline" className="w-full mb-2">
                  Manage Programs
                </Button>
              </Link>
              <Link href={`/hub/${hubId}/events`}>
                <Button variant="outline" className="w-full">
                  Manage Events
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="gallery">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>Hub image gallery</CardDescription>
            </div>
            <Link href={`/hub/${hubId}/data?tab=galerie`}>
              <Button>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit Gallery
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
                {hub?.galerie?.length > 0 ? (
                hub.galerie.map((image, index) => (
                  <div key={index} className="aspect-square relative">
                  <img
                    src={image.url}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
                  </div>
                ))
                ) : (
                <p>No images available</p>
                )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="summary">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Hub summary information</CardDescription>
            </div>
            <Link href={`/hub/${hubId}/data?tab=summary`}>
              <Button>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit Summary
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Title</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{hub?.summary?.title?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{hub?.summary?.title?.fr}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{hub?.summary?.description?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{hub?.summary?.description?.fr}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specificities">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Specificities</CardTitle>
              <CardDescription>Hub specific features</CardDescription>
            </div>
            <Link href={`/hub/${hubId}/data?tab=specificities`}>
              <Button>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit Specificities
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                {hub.specificities?.length > 0 ? (
                hub.specificities.map((specificity, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                    <h4 className="font-medium">English</h4>
                    <p className="text-lg font-semibold">{specificity.title.en}</p>
                    <p className="text-muted-foreground">{specificity.description.en}</p>
                    <img
                      src={specificity.image.en}
                      alt={specificity.title.en}
                      className="mt-2 rounded-lg h-40 object-cover"
                    />
                    </div>
                    <div>
                    <h4 className="font-medium">French</h4>
                    <p className="text-lg font-semibold">{specificity.title.fr}</p>
                    <p className="text-muted-foreground">{specificity.description.fr}</p>
                    <img
                      src={specificity.image.fr}
                      alt={specificity.title.fr}
                      className="mt-2 rounded-lg h-40 object-cover"
                    />
                    </div>
                  </div>
                  </div>
                ))
                ) : (
                <p>No specificities available</p>
                )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="services">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>Hub services</CardDescription>
            </div>
            <Link href={`/hub/${hubId}/data?tab=services`}>
              <Button>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit Services
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hub.services?.length > 0 ? (
                hub.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                    src={service.icon.url}
                    alt=""
                    className="w-8 h-8"
                    />
                    <img
                    src={service.iconHover.url}
                    alt=""
                    className="w-8 h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                    <span className="text-sm text-muted-foreground">English</span>
                    <h4 className="font-medium">{service.title.en}</h4>
                    <p className="text-sm text-muted-foreground">{service.description.en}</p>
                    </div>
                    <div>
                    <span className="text-sm text-muted-foreground">French</span>
                    <h4 className="font-medium">{service.title.fr}</h4>
                    <p className="text-sm text-muted-foreground">{service.description.fr}</p>
                    </div>
                  </div>
                  </div>
                ))
                ) : (
                <p>No services available</p>
                )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}