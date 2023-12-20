import React from 'react'

const AtheletePackages = ({ handleComponentChangepay, setpkgprice }) => {
    const buypkg = (e) => {
        setpkgprice(e.target.value)
        handleComponentChangepay('pay')

    }
    return (
        <>
            <div className="row">

                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body text-center pt-1">
                            <div className="card-header heading text-center bg-transparent fw-bolder clr-primary">Monthly</div>
                            <div className="pkg-pricing py-4">
                                <p className='clr-primary'>$80</p>
                                <small> <del>100 </del> <br /> only</small>
                            </div>
                            <div className="card-footer d-flex justify-content-center bg-transparent pb-0 pt-3">
                                <button className='btn primary-btn px-md-5 mx-auto px-3' onClick={buypkg} value={80}><p>Buy</p></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
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
                </div>
            </div></>
    )
}

export default AtheletePackages