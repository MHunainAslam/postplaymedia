'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const AllVideos = () => {



    return (
        <>
            <div className="border-bottom ">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Media" aria-label="Username" />
                    </div>
                </div>
            </div>
            <p className="para text-black mt-3">Sorry !! There&lsquo;s no media found for the request !!</p>

        </>
    )
}

export default AllVideos
