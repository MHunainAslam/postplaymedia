import Editor from '@/components/Editor';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const Reply = ({ Detailslug }) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    return (
        <>

            <div className="card border-0 py-4" >
                <div className="row g-0">
                    <div className="col-md-1 text-center">
                        <Image src="/assets/images/Modal/Avatar.png" width={100} height={100} className=" post-profile-lg " alt="..." />
                        <p className="para mb-0 fw-bold text-black text-center mt-1">
                            admin
                        </p>
                        <p className="para-sm text-black mb-0 text-center mt-1">
                            <i>Keymaster</i>
                        </p>
                        <p className="para-xs clr-light mb-0 text-center mt-1">
                            (203.78.144.140)
                        </p>
                    </div>
                    <div className="col-md-11">
                        <div className="card-body py-4 ms-md-3 rounded-4 bg-light">
                            <p className="para clr-dark mb-0">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card select-grp-opt mt-4">
                <p className='select-grp-opt-heading'>   Reply To: “{Detailslug}”</p>
                <div className="card-body py-4">
                    <div className="alert-box">
                        <p>Your account has the ability to post unrestricted HTML content.</p>
                    </div>
                    <form action="" className='mt-4'>

                        <Editor
                            name="description"
                            onChange={(data) => {
                                setData(data);
                                
                            }}
                            editorLoaded={editorLoaded}
                        />

                        <label htmlFor="" className='para-sm fw-bold mt-4'>Tags</label>
                        <input type="text" className='inp form-control' name="" id="" />

                        <label htmlFor="" className='para-sm fw-bold mt-4'>Topic Tags:</label>
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
        </>
    )
}

export default Reply