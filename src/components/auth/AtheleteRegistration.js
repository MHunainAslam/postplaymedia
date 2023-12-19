'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { APP_URL } from '../../../config'
import { useRouter } from 'next/navigation'
import { message } from 'antd'
import PayPalPay from './PayPalPay'

const AtheleteRegistration = ({ back, RoleId }) => {
    const [UserName, setUserName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [C_Password, setC_Password] = useState('')
    const [Name, setName] = useState('')
    const [Number, setNumber] = useState('')
    const [Address, setAddress] = useState('')
    const [state, setstate] = useState('')
    const [city, setcity] = useState('')
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
    const [isLoading, setisLoading] = useState(false)
    const [ActiveComponentpay, setActiveComponentpay] = useState('')
    const [Roles, setRoles] = useState([])
    const handleComponentChangepay = (componentName) => {
        setActiveComponentpay(componentName);

    };
    const [JobType, setJobType] = useState([])

    const router = useRouter()
    const AthleteRegistrationSubmit = (e) => {
        e.preventDefault()
        if (UserName === '' || Email === '' || Password === '' || C_Password === '' || Name === '' || Address === '' || CInstitute === '' || CInstituteweb === '' || ClassYear === '' || Height === '' || weight === '' || Sports === '' || Position === '' || AAUTrav === '') {
            setError(true)
        }
        else {
            setisLoading(true)
            axios.post(`${APP_URL}/api/register`, { name: Name, username: UserName, email: Email, password: Password, c_password: C_Password, role_id: RoleId, phone: Number, address: Address, current_institute: CInstitute, current_ins_website: CInstituteweb, class_year: ClassYear, height: Height, weight: weight, sports: Sports, position: Position, travel_team_name: AAUTrav, job_title: '1' })
                .then(response => {
                    // Handle successful response here
                    message.success(response.data.message)
                    console.log(response.data);
                    // router.push('/')
                    setisLoading(false)
                    handleComponentChangepay('pay')
                })
                .catch(error => {
                    // Handle error here
                    message.error(error.response?.data?.message)
                    console.error(error);
                    setisLoading(false)
                });

            setError(false)
        }
    }
    return (
        <>
            {ActiveComponentpay === '' && <>

                <form action="" onSubmit={AthleteRegistrationSubmit}>
                    <p className='heading text-center  text-dark'> <i className="bi bi-arrow-left backbtn" onClick={back}></i> Account Details</p>
                    <div className="row">
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Username  </label>
                            <input type="text" className="form-control inp" placeholder="Username" value={UserName} onChange={(e) => { setUserName(e.target.value) }} />
                            {Error ? UserName === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Email Address  </label>
                            <input type="email" className="form-control inp" placeholder="Email" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                            {Error ? Email === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>
                    </div>
                    <div className="row">
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
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor=""> Confirm Password  </label>
                            <div className="showpass">
                                <input type={ShowCPass ? 'text' : 'password'} className="form-control inp" placeholder="Re-Type Password" value={C_Password} onChange={(e) => { setC_Password(e.target.value) }} />
                                <i className={`bi ${ShowCPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowCPass(!ShowPass) }}></i>
                            </div>
                            {Error ? C_Password === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>
                    </div>
                    <p className='heading text-center mb-4 mt-5 text-dark'>Profile Details</p>
                    <div className="row">
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Name  </label>
                            <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                            {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Number (optional)</label>
                            <input type="text" className="form-control inp" placeholder="" value={Number} onChange={(e) => { setNumber(e.target.value) }} />


                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-4">
                            <label className='para-sm clr-text mt-4' htmlFor="">City  </label>
                            <select name="" className='form-select slct' id="" value={city} onChange={(e) => { setcity(e.target.value) }}>
                                <option value='' selected hidden>select City</option>
                                <option value='city1'>City 1</option>
                                <option value='city2'>City 2</option>
                            </select>
                            {Error ? city === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                        <div className="col-md-4">
                            <label className='para-sm clr-text mt-4' htmlFor="">State  </label>
                            <select name="" className='form-select slct' id="" value={state} onChange={(e) => { setstate(e.target.value) }}>
                                <option value='' selected hidden>select State</option>
                                <option value='city1'>State 1</option>
                                <option value='city2'>State 2</option>
                            </select>
                            {Error ? state === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                        <div className="col-md-4">
                            <label className='para-sm clr-text mt-4' htmlFor="">Country  </label>
                            <select name="" className='form-select slct' id="" value={Country} onChange={(e) => { setCountry(e.target.value) }}>
                                <option value='' selected hidden>select Country</option>
                                <option value='city1'>Country 1</option>
                                <option value='city2'>Country 2</option>
                            </select>
                            {Error ? Country === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className='para-sm clr-text mt-4' htmlFor="">Adress  </label>
                            <textarea type="text" className="form-control  area" rows={'3'} placeholder="" value={Address} onChange={(e) => { setAddress(e.target.value) }} />
                            {Error ? Address === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Current institute  </label>
                            <input type="text" className="form-control inp" placeholder="" value={CInstitute} onChange={(e) => { setCInstitute(e.target.value) }} />
                            {Error ? CInstitute === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Current institute website  </label>
                            <input type="url" className="form-control inp" placeholder="" value={CInstituteweb} onChange={(e) => { setCInstituteweb(e.target.value) }} />
                            {Error ? CInstituteweb === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Class Year  </label>
                            <input type="text" className="form-control inp" placeholder="" value={ClassYear} onChange={(e) => { setClassYear(e.target.value) }} />
                            {Error ? ClassYear === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Height  </label>
                            <input type="text" className="form-control inp" placeholder="" value={Height} onChange={(e) => { setHeight(e.target.value) }} />
                            {Error ? Height === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Weight</label>
                            <input type="text" className="form-control inp" placeholder="" value={weight} onChange={(e) => { setweight(e.target.value) }} />
                            {Error ? weight === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Sports</label>
                            <select name="" className='form-select slct' id="" onChange={(e) => { setSports(e.target.value) }} value={Sports}>
                                <option value='' selected hidden>--select Sports--</option>
                                <option value='BoysBasketball'>Boys Basketball</option>
                                <option value='GirlsBasketball'>Girls Basketball</option>
                                <option value='BoysBaseball'>Baseball</option>
                                <option value='GirlsFootball'>Football</option>
                            </select>
                            {Error ? Sports === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">Level </label>
                            <select name="" className='form-select slct' id="" value={Position} onChange={(e) => { setPosition(e.target.value) }}>
                                <option value='' selected hidden>--select Level--</option>
                                <option value='NCAAD1'> NCAA D1</option>
                                <option value='NCAAD2'>NCAA D2</option>
                                <option value='NCAAD3'>NCAA D3</option>
                                <option value='USPORTS'>U SPORTS</option>
                                <option value='NAIA'> NAIA</option>
                                <option value='USCAA'>USCAA</option>
                                <option value='NCCAA'>NCCAA</option>
                                <option value='CWPA'>CWPA</option>
                                <option value='MCLA'> MCLA</option>
                                <option value='High-School'> High School</option>
                                <option value='Club/Travel'>Club/Travel</option>
                                <option value='Junior-College'>Junior College</option>
                            </select>
                            {Error ? Position === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                          

                        </div>
                        <div className="col-md-6">
                            <label className='para-sm clr-text mt-4' htmlFor="">AAU/Travel Team Name  </label>
                            <input type="text" className="form-control inp" placeholder="" value={AAUTrav} onChange={(e) => { setAAUTrav(e.target.value) }} />
                            {Error ? AAUTrav === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                        </div>
                    </div>


                    <button type='submit' className='btn primary-btn mt-4 w-100'><p>Complete Sign Up {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>

                </form>
            </>}

            {ActiveComponentpay === 'pay' && <>
                <PayPalPay />
            </>}
        </>
    )
}

export default AtheleteRegistration