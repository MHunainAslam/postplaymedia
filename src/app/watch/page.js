import ActivityLayout from '@/app/ActivityLayout'
import WatchPhotosTab from '@/components/watch/WatchVideosTab'
import React from 'react'
import RootLayout from '../layout'

const page = () => {
  return (

    <ActivityLayout ActivityPages>
      <WatchPhotosTab />
    </ActivityLayout>
  )
}

export default page