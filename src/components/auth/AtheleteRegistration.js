'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import { useRouter } from 'next/navigation'
import { message } from 'antd'
import PayPalPay from './PayPalPay'
import AtheletePackages from './AtheletePackages'

const AtheleteRegistration = ({ back, RoleId }) => {
    const [UserName, setUserName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [C_Password, setC_Password] = useState('')
    const [Name, setName] = useState('')
    const [Number, setNumber] = useState('')
    const [Address, setAddress] = useState('')
    const [state, setstate] = useState('')
    const [Allstate, setAllstate] = useState([])
    const [city, setcity] = useState('')
    const [Allcity, setAllcity] = useState([])
    const [Country, setCountry] = useState('')
    const [CInstitute, setCInstitute] = useState('')
    const [CInstituteweb, setCInstituteweb] = useState('')
    const [ClassYear, setClassYear] = useState('')
    const [Height, setHeight] = useState('')
    const [weight, setweight] = useState('')
    const [Sports, setSports] = useState('')
    const [AAUTrav, setAAUTrav] = useState('')
    const [Position, setPosition] = useState('')
    const [Error, setError] = useState(false)
    const [ShowPass, setShowPass] = useState(false)
    const [ShowCPass, setShowCPass] = useState(false)
    const [pkgprice, setpkgprice] = useState('')
    const [package_id, setpackage_id] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [ActiveComponentpay, setActiveComponentpay] = useState('form')

    {/* Component change function */ }
    const handleComponentChangepay = (componentName) => {
        setActiveComponentpay(componentName);

    };

    {/* Coach registration api */ }
    const AthleteRegistrationSubmit = (e) => {
        e.preventDefault()
        if (UserName === '' || Email === '' || Password === '' || C_Password === '' || Name === '' || state === '' || city === '' || Address === '' || CInstitute === '' || CInstituteweb === '' || ClassYear === '' || Height === '' || weight === '' || Sports === '' || Position === '' || AAUTrav === '') {
            setError(true)
        }
        else {
            handleComponentChangepay('pkg')
            setError(false)
        }
    }
    const handleApprovepaypal = async (data, actions) => {
        const order = await actions?.order?.capture();
        if (order) {
            console.log('Payment was approved!', order);
            // const customId = data.orderID;
            // console.log('Custom ID:', customId);
            // setisLoading(true)
            // axios.post(`${APP_URL}/api/register`, { name: Name, email: Email, password: Password, c_password: C_Password, username: UserName, role_id: RoleId, city: city, country: 'United States', current_institute: CInstitute, current_ins_website: CInstituteweb, job_title: '1', class_year: ClassYear, height: Height, weight: weight, sports: Sports, position: Position, travel_team_name: AAUTrav, address: Address, number: Number, state: state, package_id: package_id, payment_status: 'paid' })
            //     .then(response => {
            //         // Handle successful response here
            //         message.success(response.data.message)
            //         console.log(response.data);
            //         setisLoading(false)
            //     })
            //     .catch(error => {
            //         // Handle error here
            //         message.error(error.response?.data?.message)
            //         console.error(error);
            //         setisLoading(false)
            //     });
        }
    };

    const submitform = () => {
        setisLoading(true)
        axios.post(`${APP_URL}/api/register`, { name: Name, email: Email, password: Password, c_password: C_Password, username: UserName, role_id: RoleId, city: city, country: 'United States', current_institute: CInstitute, current_ins_website: CInstituteweb, job_title: '1', class_year: ClassYear, height: Height, weight: weight, sports: Sports, position: Position, travel_team_name: AAUTrav, address: Address, number: Number, state: state })
            .then(response => {
                // Handle successful response here
                message.success(response.data.message)
                console.log(response.data);
                setisLoading(false)
            })
            .catch(error => {
                // Handle error here
                message.error(error.response?.data?.message)
                console.error(error);
                setisLoading(false)
            });
    }

    {/* get states against country api */ }
    useEffect(() => {
        axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {
            "country": "United States",
            // "state": "Kabul"
        }, {
            headers: {

                'X-RapidAPI-Key': 'c1c3fb6c0cmsh4907d3e33341dbbp1078c6jsnd4b7038ff1c5',
                'X-RapidAPI-Host': 'countries-states-cities-dataset.p.rapidapi.com'

            }
        })
            .then(response => {
                console.log('authMelayout', response);
                setAllstate(response?.data?.data?.states)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    {/* get cities against state and country api */ }
    useEffect(() => {
        axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
            "country": "United States",
            "state": state
        }, {
            headers: {

                'X-RapidAPI-Key': 'c1c3fb6c0cmsh4907d3e33341dbbp1078c6jsnd4b7038ff1c5',
                'X-RapidAPI-Host': 'countries-states-cities-dataset.p.rapidapi.com'

            }
        })
            .then(response => {
                console.log('llll', response);
                setAllcity(response?.data?.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [state])

    const checkURL = (event) => {
        let string = event.target.value;
        if (!~string.indexOf("http")) {
            string = "http://" + string;
        }
       
        setCInstituteweb(string);
    }
    return (
        <>
            {/* 1st step fill form */}
            {ActiveComponentpay === 'form' && <>
                <p className='heading text-center  text-dark'> <i className="bi bi-arrow-left backbtn" onClick={back}></i>Athelete Account Details</p>
                <form action="" onSubmit={AthleteRegistrationSubmit}>
                    <div className="row">

                        {/* username */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Username  </label>
                            <input type="text" className="form-control inp" placeholder="Username" value={UserName} onChange={(e) => { setUserName(e.target.value) }} />
                            {Error ? UserName === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        {/* email */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Email Address  </label>
                            <input type="email" className="form-control inp" placeholder="Email" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                            {Error ? Email === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        {/* choose pass */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor=""> Choose a Password  </label>
                            <div className="showpass">
                                <input type={ShowPass ? 'text' : 'password'} className="form-control inp" placeholder="Password" value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                <i className={`bi ${ShowPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass(!ShowPass) }}></i>
                            </div>
                            {Error ? Password === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                            {Password ?
                                <>
                                    {Password.length < 6 ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> password field must be at least 6 characters*</p> : ''}
                                </>
                                : ''}
                        </div>

                        {/* confirm pass */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor=""> Confirm Password  </label>
                            <div className="showpass">
                                <input type={ShowCPass ? 'text' : 'password'} className="form-control inp" placeholder="Re-Type Password" value={C_Password} onChange={(e) => { setC_Password(e.target.value) }} />
                                <i className={`bi ${ShowCPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowCPass(!ShowPass) }}></i>
                            </div>
                            {Error ? C_Password === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        <p className='heading text-center mb-4 mt-5 text-dark'>Profile Details</p>

                        {/* name */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Name  </label>
                            <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                            {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>

                        {/* number */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Number (optional)</label>
                            <input type="text" className="form-control inp" placeholder="" onKeyPress={(e) => !/[+0-9]/.test(e.key) && e.preventDefault()} value={Number} onChange={(e) => { setNumber(e.target.value) }} />
                        </div>

                        {/* state */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">State  </label>
                            <select name="" className='form-select slct' id="" value={state} onChange={(e) => { setstate(e.target.value) }}>
                                <option value='' selected hidden>select State</option>
                                {Allstate?.map((item, i) => (
                                    <option value={item.name} key={i}>{item.name}</option>
                                ))}
                                {/* <option value='city2'>State 2</option> */}
                            </select>
                            {Error ? state === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>

                        {/* city */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">City  </label>
                            <select name="" className='form-select slct' id="" value={city} onChange={(e) => { setcity(e.target.value) }}>
                                <option value='' selected hidden>select City</option>
                                {Allcity.length === 0 ?
                                    <option value=''>No City Available</option>
                                    :
                                    <>
                                        {Allcity?.map((item, i) => (
                                            <option value={item} key={i}>{item}</option>
                                        ))}
                                    </>}

                            </select>
                            {Error ? city === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>

                        {/* address */}
                        <div className="col-md-12">
                            <label className='para-sm clr-text mt-4' htmlFor="">Adress  </label>
                            <textarea type="text" className="form-control  area" rows={'3'} placeholder="" value={Address} onChange={(e) => { setAddress(e.target.value) }} />
                            {Error ? Address === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        {/* current institute */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Current institute  </label>
                            <input type="text" className="form-control inp" placeholder="" value={CInstitute} onChange={(e) => { setCInstitute(e.target.value) }} />
                            {Error ? CInstitute === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        {/* current institute web url*/}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Current institute website  </label>
                            <input type="url" className="form-control inp" placeholder="" onBlur={CInstituteweb === '' ? (e) => { setCInstituteweb(e.target.value) } : checkURL} value={CInstituteweb} onChange={(e) => { setCInstituteweb(e.target.value) }} />
                            {Error ? CInstituteweb === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>

                        {/* class year */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Class Year  </label>
                            <input type="text" className="form-control inp" placeholder="" value={ClassYear} onChange={(e) => { setClassYear(e.target.value) }} />
                            {Error ? ClassYear === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        {/* height */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Height  </label>
                            <input type="text" className="form-control inp" placeholder="" value={Height} onChange={(e) => { setHeight(e.target.value) }} />
                            {Error ? Height === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        {/* weight */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Weight</label>
                            <input type="text" className="form-control inp" placeholder="" value={weight} onChange={(e) => { setweight(e.target.value) }} />
                            {Error ? weight === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>

                        {/* sports */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Sports</label>
                            <select name="" className='form-select slct' id="" onChange={(e) => { setSports(e.target.value) }} value={Sports}>
                                <option value='' selected hidden>--select Sports--</option>
                                <option value='Boys Basketball'>Boys Basketball</option>
                                <option value='Girls Basketball'>Girls Basketball</option>
                                <option value='Boys Baseball'>Baseball</option>
                                <option value='Girls Football'>Football</option>
                            </select>
                            {Error ? Sports === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>

                        {/* level */}
                        <div className="col-md-6">
                            {/* its define as a position in backend */}
                            <label className='para-sm clr-text mt-4' htmlFor="">Level  </label>
                            <select name="" className='form-select slct' id="" value={Position} onChange={(e) => { setPosition(e.target.value) }}>
                                <option value='' selected hidden>--select Level--</option>
                                <option value='NCAAD1'> NCAA D1</option>
                                <option value='NCAAD2'>NCAA D2</option>
                                <option value='NCAAD3'>NCAA D3</option>
                                <option value='NAIA'> NAIA</option>
                                <option value='USCAA'>USCAA</option>
                                <option value='NCCAA'>NCCAA</option>
                                <option value='CWPA'>CWPA</option>
                                <option value='MCLA'> MCLA</option>
                                <option value='High School'> High School</option>
                                <option value='Club/Travel'>Club/Travel</option>
                                <option value='Junior College'>Junior College</option>
                            </select>
                            {Error ? Position === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}



                        </div>

                        {/* AAU/Travel Team Name */}
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">AAU/Travel Team Name  </label>
                            <input type="text" className="form-control inp" placeholder="" value={AAUTrav} onChange={(e) => { setAAUTrav(e.target.value) }} />
                            {Error ? AAUTrav === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>
                    </div>


                    <button type='submit' className='btn primary-btn mt-4 w-100'><p>Complete Sign Up {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>

                </form>
            </>}

            {/* 2nd step select package */}
            {ActiveComponentpay === 'pkg' && <>
                <p className='heading text-center  text-dark'> <i className="bi bi-arrow-left backbtn" onClick={() => handleComponentChangepay('form')}></i> Select Package</p>
                <AtheletePackages setpackage_id={setpackage_id} handleComponentChangepay={handleComponentChangepay} setpkgprice={setpkgprice} />
            </>}

            {/* 3rd step paypal */}
            {ActiveComponentpay === 'pay' && <>
                <p className='heading text-center  text-dark'> <i className="bi bi-arrow-left backbtn" onClick={() => handleComponentChangepay('pkg')}></i> Almost Done!</p>
                <PayPalPay pkgprice={pkgprice} handleApprovepaypal={handleApprovepaypal} />
            </>}
        </>
    )
}

export default AtheleteRegistration