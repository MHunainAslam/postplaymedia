import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'

const AtheletePackages = ({ handleComponentChangepay, setpkgprice , setpackage_id}) => {
    const [data, setdata] = useState([])
    const buypkg = (e) => {
        setpkgprice(e.target.value)
        setpackage_id(e.target.id)
        handleComponentChangepay('pay')
        console.log(e.target.id, e.target.value)
    }
    useEffect(() => {
        axios.get(`${APP_URL}/api/packages`)
            .then(response => {
                console.log(response);
                setdata(response)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <>
            <div className="row">
                {data?.data?.data?.map((item, i) => (

                    <div className="col-lg-6" key={i}>
                        <div className="card">
                            <div className="card-body text-center pt-1">
                                <div className="card-header heading text-center bg-transparent fw-bolder clr-primary">{item.name}</div>
                                <div className="pkg-pricing py-4">
                                    <p className='clr-primary'>${item.price}</p>
                                    <small>
                                        {/* <del>100 </del> <br />  */}
                                        only</small>
                                </div>
                                <div className="card-footer d-flex justify-content-center bg-transparent pb-0 pt-3">
                                    <button className='btn primary-btn px-md-5 mx-auto px-3' id={item.id} onClick={buypkg} value={item.price}><p>Buy</p></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body text-center pt-1">
                            <div className="card-header heading text-center bg-transparent fw-bolder clr-primary">Yearly</div>
                            <div className="pkg-pricing py-4">
                                <p className='clr-primary'>$900</p>
                                <small> <del>1150 </del> <br /> only</small>
                            </div>
                            <div className="card-footer d-flex justify-content-center bg-transparent pb-0 pt-3">
                                <button className='btn primary-btn px-md-5 mx-auto px-3' onClick={buypkg} value={900}><p>Buy</p></button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div></>
    )
}

export default AtheletePackages