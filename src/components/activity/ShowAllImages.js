import { Image } from 'antd';
import React, { useEffect, useState } from 'react'
import { IMG_URL } from '../../../config';

const ShowAllImages = ({ images, item }) => {
    const [imagesss, setimagesss] = useState(true)
    const [displayImages, setdisplayImages] = useState(null)
    useEffect(() => {
        setdisplayImages(images)
    }, [images])

    const openimg = () => {
        document.querySelector('.openimg3 .ant-image').click();
    }
    return (
        <div className={` ${displayImages?.length === 2 ? 'collageContainer2' : displayImages?.length === 3 ? 'collageContainer3' : displayImages?.length === 4 ? 'collageContainer4' : 'collageContainer'}`}>


            <Image.PreviewGroup
                preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
            >
                {displayImages?.map((image, index) => (
                    <div className={`imageWrapper openimg${index} ${index > 4 && 'd-none'}`} key={index}>
                        <div>
                            {image?.media?.url.slice(-4) == '.mp4' || image?.media?.url.slice(-4) == '.mov' || image?.media?.url.slice(-4) == '.wmv' || image?.media?.url.slice(-4) == '.avi' ?
                                <video
                                    className='pointer h-100 postimg w-100 dsd'
                                    src={IMG_URL + image?.media?.url}
                                    controls
                                />
                                :
                                <Image
                                    src={IMG_URL + image.media.url} alt={`Image ${index + 1}`} className={'image'}
                                />
                            }

                            {index === 4 && images.length > 5 && (
                                <div className={'moreOverlay'} onClick={openimg}>
                                    +{images.length - 5} more
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Image.PreviewGroup >
        </div>

    )
}

export default ShowAllImages