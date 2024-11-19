import React, { useEffect, useState } from 'react';

import CloseIcon from '../../assets/close.svg';
import FeedImagePaginationLeft from '../../assets/feed_image_pagination_left.svg';
import FeedImagePaginationRight from '../../assets/feed_image_pagination_right.svg';
import { Circle } from '../../components/Circle';

export const ImageCarousel = ({
    contents,
    removeContent,
}: {
    contents: { url: string; contentType: 'image' | 'video' }[];
    removeContent?: (contentUrl: string) => void;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [contentDimensions, setContentDimensions] = useState({ width: 350, height: 280 });

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % contents.length);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + contents.length) % contents.length);

    useEffect(() => {
        if (contents.length > 0 && contents[currentIndex]) {
            console.log({ contents });
            fetchContentDimensions(contents[currentIndex]);
        }
    }, [currentIndex, contents]);

    const fetchContentDimensions = async (content: { url: string; contentType: string }) => {
        if (!content) return;
        setLoading(true);
        const dimensions = await getContentDimensions(content);
        setContentDimensions(dimensions);
        setLoading(false); // End loading
    };

    function useMediaDimensions(src: string) {
        const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

        useEffect(() => {
            const image = new Image();
            image.onload = () => {
                setDimensions({ width: image.width, height: image.height });
            };
            image.src = src;

            // Cleanup function to prevent memory leaks
            return () => {
                image.onload = null;
            };
        }, [src]);

        return dimensions;
    }

    // Modify the function to be async
    async function getContentDimensions(content: { url: string; contentType: string }) {
        const maxHeight = 280;
        let originalWidth = 0;
        let originalHeight = 0;

        const container = document.getElementById('feed_container');

        // Using offsetWidth and offsetHeight
        const offsetWidth = container!.offsetWidth;

        console.log('Width (with padding and border):', offsetWidth, 'px');

        // Using getBoundingClientRect()
        const rect = container!.getBoundingClientRect();
        const maxWidth = rect.width;

        if (content.contentType === 'video') {
            const videoElement = document.createElement('video');
            videoElement.src = content.url;

            const dimensions: { width: number; height: number } = await new Promise((resolve) => {
                videoElement.addEventListener('loadedmetadata', function () {
                    resolve({ width: this.videoWidth, height: this.videoHeight });
                });
            });

            originalWidth = dimensions.width;
            originalHeight = dimensions.height;
        } else {
            const image = new Image();
            image.src = content.url;
            await image.decode(); // Ensure the image is loaded, decode() returns a promise

            originalWidth = image.width;
            originalHeight = image.height;
        }

        const aspectRatio = originalWidth / originalHeight;

        // Calculate new dimensions based on max constraints
        let newHeight = originalHeight;
        const newWidth = originalWidth;

        // if (originalHeight > maxHeight) {
        //     newHeight = maxHeight;
        //     newWidth = newHeight * aspectRatio;
        // }

        newHeight = newWidth / aspectRatio;

        return {
            height: newHeight,
            width: maxWidth,
            maxWidth,
        };
    }

    const renderContent = (content: { url: string; contentType: string }, index: React.Key | null | undefined) => {
        if (loading) {
            return <div>Loading...</div>; // Or any loading indicator
        }

        if (content.contentType === 'video') {
            return (
                <video
                    key={index}
                    controls
                    style={{
                        width: contentDimensions.width,
                        borderRadius: '10px',
                    }}
                    src={content.url}
                />
            );
        } else {
            return (
                <img
                    key={index}
                    src={content.url}
                    alt={`Content ${index}`}
                    style={{
                        borderRadius: '10px',
                        width: contentDimensions.width,
                    }}
                />
            );
        }
    };

    // Inside the ImageCarousel component
    const handleRemove = (contentUrl: string) => {
        if (removeContent) {
            removeContent(contentUrl);

            // Adjust currentIndex if the removed content is the currently displayed one
            // or if the removal makes currentIndex out of bounds.
            const newIndex = contents.findIndex((content) => content.url === contentUrl);
            if (currentIndex >= newIndex || currentIndex === contents.length - 1) {
                setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
            }
        }
    };

    const paginationDots = () => {
        return Array.from({ length: contents.length }).map((_, index) => (
            <div
                key={index}
                className={`pagination_dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                style={{
                    height: '4px',
                    width: '4px',
                    borderRadius: '50%',
                    margin: '0 4px',
                    backgroundColor: index === currentIndex ? '#000' : '#ccc',
                    cursor: 'pointer',
                }}
            />
        ));
    };

    return (
        <div className="image-carousel" style={{ position: 'relative', display: contents.length > 0 ? 'block' : 'none' }}>
            <div className="carousel-images">
                {contents.map((content, index) => (
                    <div
                        key={index}
                        className="flex-row img_view centralize-y centralize-x"
                        style={{
                            display: index === currentIndex ? 'flex' : 'none',
                            position: 'relative',
                            background: 'transparent',
                            borderRadius: '10px',
                        }}
                    >
                        {renderContent(content, index)}
                        {removeContent && (
                            <button
                                className="remove_img"
                                style={{ position: 'absolute', top: 12, right: 10, zIndex: 2 }}
                                onClick={() => handleRemove(content.url)}
                            >
                                <Circle img={CloseIcon} width={20} height={20} bg={'#959595'} pd={3} noBorder />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {contents.length > 1 && (
                <>
                    <button
                        className="_img_pagination_btn _left"
                        onClick={goToPrev}
                        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
                    >
                        <img src={FeedImagePaginationLeft} alt="Previous" />
                    </button>
                    <button
                        className="_img_pagination_btn _right"
                        onClick={goToNext}
                        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
                    >
                        <img src={FeedImagePaginationRight} alt="Next" />
                    </button>
                    <div
                        className="pagination_dots"
                        style={{ position: 'absolute', bottom: -25, left: '50%', transform: 'translateX(-50%)', display: 'flex' }}
                    >
                        {paginationDots()}
                    </div>
                </>
            )}
        </div>
    );
};
