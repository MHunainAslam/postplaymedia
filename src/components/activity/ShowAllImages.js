import { Image } from 'antd';
import React, { useState } from 'react'

const ShowAllImages = ({ images }) => {
    const [imagesss, setimagesss] = useState(true)
    const displayImages = images.length > 4 ? images.slice(0, 4) : images;
    return (
        <div className={'collageContainer'}>


            <Image.PreviewGroup
                preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
            >
                {displayImages.map((image, index) => (
                    <div className='imageWrapper' key={index}>
                        <div>
                            <Image

                                src={image} alt={`Image ${index + 1}`} className={'image'}
                            />
                          
                        </div>
                    </div>
                ))}
            </Image.PreviewGroup >
        </div>

    )
}

export default ShowAllImages