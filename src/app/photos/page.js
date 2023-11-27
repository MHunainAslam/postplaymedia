import React from 'react'
import ActivityLayout from '../ActivityLayout'
import PhotosTab from '@/components/photos/PhotosTab'

const Page = () => {
    return (
        <ActivityLayout ActivityPages>
            <>
            
                <PhotosTab />
            </>
        </ActivityLayout>

    )
}

export default Page