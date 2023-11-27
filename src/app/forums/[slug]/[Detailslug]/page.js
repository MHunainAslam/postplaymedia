'use client'
import ActivityLayout from '@/app/ActivityLayout'
import SlugTopicTheme from '@/components/forums/SlugTopicTheme'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  console.log(useParams())
  const { Detailslug } = useParams()
  return (
    <ActivityLayout ActivityPages>
      <SlugTopicTheme Detailslug={Detailslug} />
    </ActivityLayout>
  )
}

export default Page