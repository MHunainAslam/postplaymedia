import React from 'react'
import ActivityLayout from '../ActivityLayout'
import PhotosTab from '@/components/photos/PhotosTab'
import RootLayout from '../layout'

const Page = () => {
    return (
        <RootLayout Activity>
            <>

                <PhotosTab />
            </>
        </RootLayout>

    )
}

export default Page