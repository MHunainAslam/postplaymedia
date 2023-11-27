import ActivityLayout from '@/app/ActivityLayout'
import WatchPhotosTab from '@/components/watch/WatchVideosTab'
import React from 'react'

const page = () => {
  return (
    <ActivityLayout ActivityPages>
      <WatchPhotosTab />
    </ActivityLayout>
  )
}

export default page