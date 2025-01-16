import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { api } from '@/services/api'

type Props = {
  apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo'
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ onChange, value }: Props) => {
  const type = value?.split('.').pop()

  // specify upload params and url for your files
  const getUploadParams = ({ meta }: { meta: any }) => { return { url: 'https://httpbin.org/post' } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: { meta: any, file: any }, status: any) => { console.log(status, meta, file) }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = async (files: any) => {
    const formData = new FormData()
    files.forEach((file: any) => {
      formData.append('file', file.file)
    })

    try {
      const response = await api.post<{ link: string }>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      onChange(response.data.link)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={() => onChange('')}
          variant="ghost"
          type="button"
        >
          <X className="h-4 w-4" />
          Remove Logo
        </Button>
      </div>
    )
  }
  return (
    <div className="w-full bg-muted/30">
      
    <input
      type="file"
      onChange={async (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      formData.append('siteId', "dml");
      formData.append('name', files[0].name);
      formData.append('type', files[0].type);
      try {
        const response = await axios.post<{ link: string }>('/upload', formData, {
          headers: {
        'Content-Type': 'multipart/form-data',
          },
        });
        onChange(response.data.link);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
        }
      }}
      accept="image/*,audio/*,video/*,application/pdf,image/svg+xml"
      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
    />
    </div>
  )
}

export default FileUpload
