// FancyBox.js
import Image from 'next/image';
import React, { useState } from 'react';
import InputEmoji from "react-input-emoji";
const FancyBox = ({ images, modalOpen, closeModal, selectedImage, setSelectedImage }) => {




    const nextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setSelectedImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    const [text, setText] = useState("");

    return (

       
            <div className="modal fade fancy-box-modal" id={"selectedImage"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable mx-auto d-flex align-items-center  fanncybox-body ">
                    <div className="modal-content border-0 bg-transparent">

                        <div className="modal-body">
                            {modalOpen && selectedImage !== null && (
                                <>
                                    <div className={`row`}>
                                        <div className="col-md fancyimgsec position-relative d-flex align-items-center">
                                            <Image width={5000} height={5000} src={images[selectedImage].url} className='w-100 object-fit-contain h-100' alt={` ${selectedImage + 1}`} />
                                            <button className='post-back-btn' onClick={prevImage}><i className="bi bi-chevron-left"></i></button>
                                            <button className='post-next-btn' onClick={nextImage}><i className="bi bi-chevron-right"></i></button>
                                        </div>
                                        <div className="col-md-4 commentsec">
                                            <div className="d-flex flex-column justify-content-between h-100">
                                                <div>
                                                    <div className="d-flex justify-content-end">
                                                        <span className="close pointer" data-bs-dismiss="modal" onClick={closeModal}>&times;</span>
                                                    </div>
                                                    <div className="d-flex  align-items-center">
                                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                        <div className="">
                                                            <p className="heading-sm text-black mb-0 ms-3">Scott</p>
                                                            <p className="para clr-light mb-0 ms-3">20 November 2023 <i className="bi bi-globe-americas ms-2"></i></p>
                                                        </div>
                                                    </div>
                                                    <div className="post-card-actions py-2">
                                                        <span><i className="bi bi-hand-thumbs-up "></i> Like</span>
                                                        <span className='comment-active'> 1</span>
                                                        <span className='pointer'> Comment</span>
                                                        <span className='comment-active'> 1</span>
                                                    </div>
                                                    <div className='comment-body'>
                                                        {images[selectedImage].comment}
                                                    </div>
                                                </div>
                                                <div className='mb-3'>

                                                    <InputEmoji
                                                        className="inp"
                                                        value={text}
                                                        onChange={setText}
                                                        cleanOnEnter
                                                        placeholder="Type a message"
                                                    />
                                                    <button className='btn primary-btn ms-2 mt-2'><p>Comment</p></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>



    );
};

export default FancyBox;
