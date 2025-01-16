"use client"
import React, { useEffect } from 'react'
import { useCurrentUser, useCurrentUserProfile } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import { useStore } from '@/contexts/store'

function SettingsViews() {
  const router = useRouter();
  const user = useCurrentUser();
  const profile = useCurrentUserProfile();
  const { dispatch } = useStore();

  const handleDeleteAccount = () => {
    router.push('/settings/delete-account');
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <div className="flex justify-between items-center mb-6">
        
        <div>
          <button 
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    
      <div className="space-y-6">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
          <div className='mb-4'>
            <span className='block text-gray-600'>Name</span>
            <p className='text-gray-800'>{profile?.name}</p>
          </div>
          <div className='mb-4'>
            <span className='block text-gray-600'>Email</span>
            <p className='text-gray-800'>{profile?.email}</p>
          </div>
          <div className='mb-4'>
            <span className='block text-gray-600'>Phone</span>
            <p className='text-gray-800'>{profile?.phone}</p>
          </div>
          <div>
            <a 
              href='/settings/edit' 
              className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Personal Information
            </a>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Password</h4>
          <div className='mb-4'>
            <span className='block text-gray-600'>My Password</span>
            <p className='text-gray-800'>**********</p>
          </div>
          <div>
            <button 
              onClick={() => router.push('/settings/change-password')}
              className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <button 
          onClick={handleDeleteAccount}
          className="block w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default SettingsViews
