
import React, { useContext } from 'react'
import ActivityLayout, { UserContext } from '../ActivityLayout'
import PhotosTab from '@/components/photos/PhotosTab'



const page = () => {
    return (
        <ActivityLayout ActivityPages>
            <PhotosTab />
        </ActivityLayout>

    )
}

export default page