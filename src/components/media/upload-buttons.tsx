'use client'
//import { useModal } from '@/providers/modal-provider'
import React, { useState } from 'react'
import { Button } from '../ui/button'
//import CustomModal from '../global/custom-modal'
import UploadMediaForm from '../forms/upload-media'
import Modal from '../Modal'
import { api } from '@/services/api'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
  siteId: string
}

const MediaUploadButton = ({ siteId }: Props) => {
  //const { isOpen, setOpen, setClose } = useModal()
  const { toast } = useToast()
  const router = useRouter()
  return (
    <>
    <Button onClick={() => document.getElementById('upload-input')?.click()}>
      Upload
    </Button>
    <input
      type="file"
      multiple
      onChange={async (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
      }
      formData.append('siteId', "dml");

     
      
      try {
      await api.post<{ link: string }>('/upload/multiple', formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
      });
      /* onChange(response.data.link); */
      toast({ title: 'Succes', description: 'Uploaded media' })
      router.refresh()
      } catch (error) {
      console.error('Error uploading file:', error);
      }
      }
      }}
      accept="image/*,audio/*,video/*,application/pdf,image/svg+xml"
      id="upload-input"
      style={{ display: 'none' }}
    />
    </>
  )
}

export default MediaUploadButton