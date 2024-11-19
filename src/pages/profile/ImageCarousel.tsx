// import { useState } from 'react';
// import FeedImagePaginationLeft from '../../assets/feed_image_pagination_left.svg';
// import FeedImagePaginationRight from '../../assets/feed_image_pagination_right.svg';
// import { SmallIcon } from '.';
// import CloseIcon from '../../assets/close.svg';
// import { Circle } from '../../components/Circle';

// export const ImageCarousel = ({ images, removeImage }: { images: string[], removeImage?: (imageName: string) => void }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const goToNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//     };

//     const goToPrev = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//     };
//     //  Pagination count of max 4 buttons
//     const paginationCountMax = Math.min(4, images.length);
//     const ratio = images.length / paginationCountMax;
//     const currentImagePositionInPagination = Math.round((currentIndex + 1) / ratio);
//     return (
//         <>
//             {
//                 images.length < 1 ? <> </>
//                     :
//                     <div className="image-carousel">
//                         <div className="carousel-images flex-row centralize-y centralize-x">
//                             {images.map((image, index) => (
//                                 <div className="img_view flex-row centralize-x centralize-y" style={{ display: index === currentIndex ? 'block' : 'none', width: '100%', position: 'relative', background: '#f5f5f5', padding: '10px', borderRadius: '10px' }}>
//                                     <>
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Image ${index}`}
//                                             style={{ width: '100%' }} />
//                                         {
//                                             removeImage && <button className="remove_img" style={{ position: 'absolute', top: 15, right: 10 }} onClick={() => removeImage(image)}>
//                                                 <Circle img={CloseIcon} width={20} height={20} bg={'#959595'} pd={3} noBorder />
//                                             </button>
//                                         }
//                                     </>
//                                 </div>
//                             ))}
//                         </div>
//                         {
//                             images.length > 1 &&
//                             <>
//                                 <button className='img_pagination_btn left' onClick={goToPrev}><SmallIcon src={FeedImagePaginationLeft} /></button>
//                                 <button className='img_pagination_btn right' onClick={goToNext}><SmallIcon src={FeedImagePaginationRight} /></button>

//                                 <div className="pagination_counter flex-row centralize-y centralize-x">
//                                     <div className="counter flex-row">
//                                         {Array.from({ length: paginationCountMax }).map((_, index) => (
//                                             // console.log({ currentImagePositionInPagination, index })
//                                             <div className={`pagination_icon ${(currentImagePositionInPagination === index + 1) ? 'current_page' : ''}}`} style={{
//                                                 backgroundColor: (currentImagePositionInPagination === index + 1) ? 'white' : '#959595',
//                                                 width: (currentImagePositionInPagination === index + 1) ? '27px' : '',
//                                             }}>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </>
//                         }
//                     </div>
//             }
//         </>
//     );
// };
