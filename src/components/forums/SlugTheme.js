'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Editor from '../Editor'

const SlugTheme = ({ slug }) => {
    const [isSubscribe, setisSubscribe] = useState(false)
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    return (
        <>
            <div className='border-bottom'>
                <nav style={{ '--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E")' }} aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item para"><Link className=' clr-primary link-hov fw-bold' href="/">Home</Link></li>
                        <li className="breadcrumb-item para"><Link className=' clr-primary link-hov fw-bold' href="/forums">Forums</Link></li>
                        <li className="breadcrumb-item active para fw-bold" aria-current="page">{slug}</li>
                    </ol>
                </nav>
            </div>
            <p className="heading clr-text mt-4">Enter Group Name &amp; Description</p>
            <p className='clr-primary link-hov para pointer d-inline-block' onClick={() => { setisSubscribe(!isSubscribe) }}><i className={`bi bi-${isSubscribe ? 'dash' : 'plus'}-circle`}> </i>{isSubscribe ? 'Unsubscribe' : 'Subscribe'}</p>
            <div className="alert-box">
                <p>
                    This forum has 2 topics, and was last updated 3 years, 10 months ago by
                </p>
                <Link href={''} className="mini-user ms-2 link-hov">
                    <Image src={'/assets/images/Modal/Avatar.png'} width={100} height={100} alt=''></Image>
                    admin
                </Link>
            </div>
            <div className='table-responsive mt-4 job-manage-table AllForumTable'>
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
                    <tbody className='pt-3'>
                        <tr>
                            <th className='forum-table-icon'>
                                <p>
                                    <i className="bi bi-pencil-square"></i>
                                </p>
                            </th>
                            <td className='text-start readmore-td'>
                                <Link href={`/forums/${slug}/slug`} className="link-hov heading-m text-black">How do I hack my ex girlfriends facebook account?</Link>
                                <p>Started by: <Link href={''} className="mini-user ms-2 link-hov">
                                    <Image src={'/assets/images/Modal/Avatar.png'} width={100} height={100} alt=''></Image>
                                    admin
                                </Link> </p>

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
                                <p>Started by: <Link href={''} className="mini-user ms-2 link-hov">
                                    <Image src={'/assets/images/Modal/Avatar.png'} width={100} height={100} alt=''></Image>
                                    admin
                                </Link> </p>
                            </td>
                            <td>2</td>
                            <td>2</td>
                            <td>3 years, 9 months ago <br /> admin</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div>
                <div className="card select-grp-opt mt-4">
                    <p className='select-grp-opt-heading'>   Create New Topic in “{slug}”</p>
                    <div className="card-body py-4">
                        <div className="alert-box">
                            <p>Your account has the ability to post unrestricted HTML content.</p>
                        </div>
                        <form action="" className='mt-4'>
                            <label htmlFor="" className='para-sm fw-bold mb-0'>Topic Title (Maximum Length: 80):</label>
                            <input type="text" className='inp form-control' name="" id="" maxLength={80} />

                            <div className="mt-4">
                                <Editor
                                    name="description"
                                    onChange={(data) => {
                                        setData(data);

                                    }}
                                    editorLoaded={editorLoaded}
                                />
                            </div>

                            <label htmlFor="" className='para-sm fw-bold mt-4'>Topic Tags:</label>
                            <input type="text" className='inp form-control' name="" id="" />

                            <label htmlFor="" className='para-sm fw-bold mt-4'>Topic Type:</label>
                            <select name="" className='form-select slct' id="">
                                <option value="normal">Normal</option>
                                <option value="sticky">Sticky</option>
                                <option value="supersticky">Super Sticky</option>
                            </select>

                            <label htmlFor="" className='para-sm fw-bold mt-4'>Topic Staus:</label>
                            <select name="" className='form-select slct' id="">
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="spam">Spam</option>
                                <option value="trash">Trash</option>
                                <option value="pending">Pending</option>
                            </select>

                            <div className="d-flex align-items-center mt-4">
                                <input type="checkbox" className=' form-check-input mt-0' name="" id="NotifyEmail" />
                                <label htmlFor="NotifyEmail" className='para-sm fw-bold mb-0 ms-2'>Notify me of follow-up replies via email:</label>
                            </div>

                            <button className='btn primary-btn px-md-5 mt-4'><p>Submit</p></button>
                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}

export default SlugTheme