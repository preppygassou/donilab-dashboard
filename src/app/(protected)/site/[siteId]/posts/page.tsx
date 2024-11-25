import Posts from '@/components/views/Posts'
import React from 'react'

const Page = async ({params}) => {
  const siteId=params.siteId
  return (
    <Posts/>
  )
}

export default Page