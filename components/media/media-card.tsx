'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Copy, MoreHorizontal, Trash,FileIcon } from 'lucide-react'
import Image from 'next/image'
//import { deleteMedia, saveActivityLogsNotification } from '@/lib/queries'
import { toast } from '../ui/use-toast'
import { Media } from '../../types'
import { useDeleteMedia } from '../../hooks/useMedia'

type Props = { file: Media }

const MediaCard = ({ file }: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const deleteMedia = useDeleteMedia();

  return (
    <AlertDialog>
      <DropdownMenu>
        <article className="border w-full rounded-lg bg-slate-900">
            {file.type === 'pdf' ? (
            <div className="relative w-full h-40">
              <Image
              src="/shutterstock_1577663251.png"
              alt="PDF icon"
              fill
              className="object-cover rounded-lg"
              />
              
            </div>
          ) : (
            <div className="relative w-full h-40">
              <Image
                src={file.link}
                alt="preview image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <p className="opacity-0 h-0 w-0">{file.name}</p>
          <div className="p-4 relative">
            <p className="text-muted-foreground">
              {new Date(file.createdAt).toDateString()}
            </p>
            <p>{file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}</p>
            <div className="absolute top-4 right-4 p-[1px] cursor-pointer ">
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
            </div>
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
              navigator.clipboard.writeText(file.link)
              toast({ title: 'Copied To Clipboard' })
              }}
            >
              <Copy size={15} /> Copy Image Link
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                const link = document.createElement('a')
                link.href = file.link
                link.target = '_blank'
                link.download = file.name
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                toast({ title: 'Download Started', description: 'File is being saved in your download directory' })
              }}
            >
              <FileIcon size={15} /> Download File
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
              <Trash size={15} /> Delete File
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </article>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Are you sure you want to delete this file? All subaccount using this
            file will no longer have access to it!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive"
            onClick={async () => {
              setLoading(true)
              await deleteMedia.mutateAsync(file.id); 
              //const response = await deleteMedia.mutateAsync(file.id); 
             /*  await saveActivityLogsNotification({
                agencyId: undefined,
                description: `Deleted a media file | ${response?.name}`,
                subaccountId: response.subAccountId,
              }) */
              toast({
                title: 'Deleted File',
                description: 'Successfully deleted the file',
              })
              setLoading(false)
              router.refresh()
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MediaCard