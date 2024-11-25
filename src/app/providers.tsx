"use client"

import { useEffect } from 'react'
import { StoreProvider } from '@/contexts/store'
import { useRouter } from 'next/navigation'

const Providers = ({
  children,session
}: {
  children: React.ReactNode,
  session:any
}) => {

 
  const router = useRouter();

  useEffect(() => {
    const onStorageChange = (event:StorageEvent) => {
      if (event.key === 'logout') {
     router.refresh();
      }
      if (event.key === 'login') {
     router.refresh();
      }
    };

    window.addEventListener('storage', onStorageChange);
    
    return () => {
      window.removeEventListener('storage', onStorageChange);
    };

  }, [router]);

  return (

        <StoreProvider>
            {children}
        </StoreProvider>
  )
}

export default Providers;