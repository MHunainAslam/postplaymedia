'use client'
import ActivityLayout from '@/app/ActivityLayout'
import SlugTheme from '@/components/forums/SlugTheme'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  console.log(useParams())
  const { slug } = useParams()
  return (
    <ActivityLayout ActivityPages>
      <SlugTheme slug={slug} />
    </ActivityLayout>
  )
}

export default Page