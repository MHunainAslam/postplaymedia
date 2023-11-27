'use client'
import { useState } from 'react';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

// Replace these custom image URLs and dimensions with your own
const customImages = [
    { url: '/assets/images/posts/covers.jpg', width: 3840, height: 1080 },
    { url: '/assets/images/posts/cover.jpeg', width: 3840, height: 800 },
    // Add more custom image objects as needed
];

const CustomGalleryPage = () => {
    const [index, setIndex] = useState(-1);

    const customPhotos = customImages.map((image) => {
        const width = breakpoints[0];
        const height = (image.height / image.width) * width;

        return {
            src: image.url,
            width,
            height,
            srcSet: breakpoints.map((breakpoint) => {
                const height = Math.round((image.height / image.width) * breakpoint);
                return {
                    src: image.url,
                    // width: breakpoint,
                    // height,
                };
            }),
        };
    });

    return (
        <div>
            <div className="col-md-6">
            <PhotoAlbum
                photos={customPhotos}
                layout="rows"
                targetRowHeight={150}
                onClick={({ index }) => setIndex(index)}
            />
            </div>

            <Lightbox
                slides={customPhotos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[]}
            />
        </div>
    );
};

export default CustomGalleryPage;
