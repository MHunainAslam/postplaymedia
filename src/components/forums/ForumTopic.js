'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const ForumTopic = () => {
    const [expanded, setExpanded] = useState([]);

    const toggleExpand = (index) => {
      const newExpanded = [...expanded];
      newExpanded[index] = !newExpanded[index];
      setExpanded(newExpanded);
    };
  
    return (
        <>

            <div className="border-bottom ">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search "></i></span>
                        <input type="text" className="form-control " placeholder="Search" aria-label="Username" />
                    </div>
                </div>
            </div>
            <div className='table-responsive job-manage-table AllForumTable'>
                <table className=" table">
                    <thead className='border-bottom'>
                        <tr>
                            <th scope="col"></th>
                            <th className='text-start' scope="col">Forum</th>
                            <th scope="col">Topics</th>
                            <th scope="col">Posts</th>
                            <th scope="col">Last Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='forum-table-icon'>
                                <p>
                                <i className="bi bi-pencil-square"></i>
                                </p>
                            </th>
                            <td className='text-start readmore-td'>
                                <Link href={'#'} className="link-hov heading-m text-black">How do I hack my ex girlfriends facebook account?</Link>
                                <p>Started by: <Link className='clr-primary' href={'#'}>admin</Link> in:  <Link className='clr-primary' href={'#'}>Programming</Link></p>
                              
                            </td>
                            <td>2</td>
                            <td>2</td>
                            <td>3 years, 9 months ago <br /> admin</td>
                        </tr>
                        <tr>
                            <th className='forum-table-icon'>
                                <p>
                                <i className="bi bi-pencil-square"></i>
                                </p>
                            </th>
                            <td className='text-start readmore-td'>
                                <Link href={'#'} className="link-hov heading-m text-black">What is the most dangerous snake in the world?</Link>
                                <p>Started by: <Link className='clr-primary' href={'#'}>admin</Link> in:  <Link className='clr-primary' href={'#'}>Programming</Link></p>
                            </td>
                            <td>2</td>
                            <td>2</td>
                            <td>3 years, 9 months ago <br /> admin</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ForumTopic