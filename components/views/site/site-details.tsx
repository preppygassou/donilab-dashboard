'use client'

import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import Link from 'next/link'
import { EditIcon } from 'lucide-react'
import ErrorAlert from '../../ErrorAlert'
import LoadingSpinner from '../../LoadingSpinner'
import { useSite, useUpdateSite } from '../../../hooks/useSites'
import { useState } from 'react'
import Modal from '../../Modal'
import SiteForm from '../../SiteForm'


export function SiteDetails({ siteId }: { siteId: string }) {
  const updateSite = useUpdateSite();
  const { data: site, isLoading, error } = useSite(siteId);
const [editingSite, setEditingSite] = useState<any>(null);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Site not found" />;

  return (
  <Tabs defaultValue="overview" className="space-y-4">
    <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="contact">Contact Page</TabsTrigger>
    <TabsTrigger value="about">About Page</TabsTrigger>
    <TabsTrigger value="header">Header</TabsTrigger>
    <TabsTrigger value="footer">Footer</TabsTrigger>
    </TabsList>

    <TabsContent value="overview">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Site details and status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
        <span className="font-medium">Title (EN):</span>
        <span>{site.name.en}</span>
        </div>
        <div className="flex justify-between">
        <span className="font-medium">Title (FR):</span>
        <span>{site.name.fr}</span>
        </div>
        <div className="flex justify-between">
        <span className="font-medium">Status:</span>
        <span className={`${
          site.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
        }`}>
          {site.status}
        </span>
        </div>
        <div className="flex justify-between">
        <span className="font-medium">Created:</span>
        <span>{new Date(site.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="pt-4">
        <Button className="w-full" onClick={()=>{setEditingSite(site)}}>
                    <EditIcon className="mr-2 h-4 w-4" />
                    Edit Basic Info
                  </Button>
                  <Modal
                          open={!!editingSite}
                          onClose={() => setEditingSite(null)}
                          title="Edit Site"
                        >
                          <SiteForm
                            initialData={editingSite}
                            onSubmit={async (data) => {
                              await updateSite.mutateAsync({ id: editingSite.id, ...data });
                              setEditingSite(null);
                            }}
                            onCancel={() => setEditingSite(null)}
                          />
                        </Modal>
        </div>
      </CardContent>
      </Card>

      <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage site content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href={`/site/${siteId}/data`}>
        <Button variant="outline" className="w-full mb-2">
          Manage site Content
        </Button>
        </Link>
        <Link href={`/site/${siteId}/expertise`}>
        <Button variant="outline" className="w-full mb-2">
          Manage site expertise
        </Button>
        </Link>
        <Link href={`/site/${siteId}/impact`}>
        <Button variant="outline" className="w-full">
          Manage site impact
        </Button>
        </Link>
        <Link href={`/site/${siteId}/services`}>
        <Button variant="outline" className="w-full">
          Manage site services
        </Button>
        </Link>
      </CardContent>
      </Card>
    </div>
    </TabsContent>

    <TabsContent value="contact">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Contact Page</CardTitle>
            <CardDescription>Site contact information</CardDescription>
          </div>
          <Link href={`/site/${siteId}/data?tab=contact`}>
            <Button>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit Contact
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Title</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{site?.data?.contact_page?.title?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{site?.data?.contact_page?.title?.fr}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{site?.data?.contact_page?.description?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{site?.data?.contact_page?.description?.fr}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="about">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>About Page</CardTitle>
            <CardDescription>Site about information</CardDescription>
          </div>
          <Link href={`/site/${siteId}/data?tab=about`}>
            <Button>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit About
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Title</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{site?.data?.about_page?.title?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{site?.data?.about_page?.title?.fr}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{site?.data?.about_page?.description?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{site?.data?.about_page?.description?.fr}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="header">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Header</CardTitle>
            <CardDescription>Site header information</CardDescription>
          </div>
          <Link href={`/site/${siteId}/data?tab=header`}>
            <Button>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit Header
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Title</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{site?.data?.header?.title?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{site?.data?.header?.title?.fr}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="footer">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Footer</CardTitle>
            <CardDescription>Site footer information</CardDescription>
          </div>
          <Link href={`/site/${siteId}/data?tab=footer`}>
            <Button>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit Footer
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Title</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">English</span>
                  <p>{site?.data?.footer?.title?.en}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">French</span>
                  <p>{site?.data?.footer?.title?.fr}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
  )
}