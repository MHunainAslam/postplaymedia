'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import { message } from 'antd'

const CoachRegistration = ({ back, RoleId }) => {
    const [UserName, setUserName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [C_Password, setC_Password] = useState('')
    const [Name, setName] = useState('')
    const [jobtitle, setjobtitle] = useState('')
    const [Number, setNumber] = useState('')
    const [Address, setAddress] = useState('')
    const [CInstitute, setCInstitute] = useState('')
    const [CInstituteweb, setCInstituteweb] = useState('')
    const [MemberType, setMemberType] = useState('')
    const [state, setstate] = useState('')
    const [city, setcity] = useState('')
    const [Allcity, setAllcity] = useState([])
    const [Allstate, setAllstate] = useState([])
    const [Country, setCountry] = useState('')
    const [Error, setError] = useState(false)
    const [ShowPass, setShowPass] = useState(false)
    const [ShowCPass, setShowCPass] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [JobType, setJobType] = useState([])
    const router = useRouter()

    {/* Coach registration api */ }
    const CoachRegistrationSubmit = (e) => {
        e.preventDefault()
        if (UserName === '' || Email === '' || Password === '' || C_Password === '' || Name === '' || Address === '' || CInstitute === '' || CInstituteweb === '' || jobtitle === '' || state === '' || city === '') {
            setError(true)
        }
        else {
            setisLoading(true)
            console.log(UserName, Email, Password, C_Password, Name, MemberType)
            axios.post(`${APP_URL}/api/register`, { name: Name, username: UserName, email: Email, password: Password, c_password: C_Password, role_id: RoleId, phone: Number, address: Address, current_institute: CInstitute, current_ins_website: CInstituteweb, job_title: jobtitle, class_year: null, height: null, weight: null, sports: null, position: null, travel_team_name: null, city: city, country: 'United States',  })
                .then(response => {
                    // Handle successful response here
                    message.success(response.data.message)
                    console.log(response.data);
                    router.push('/')
                    setisLoading(false)
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

    {/* get job api */ }
    useEffect(() => {
        axios.get(`${APP_URL}/api/sub-roles`)
            .then(response => {
                console.log(response);
                setJobType(response)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

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

    return (
        <>
            <form action="" onSubmit={CoachRegistrationSubmit}>
                <p className='heading text-center  text-dark'> <i className="bi bi-arrow-left backbtn" onClick={back}></i> Account Details</p>
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
                            <i className={`bi ${ShowCPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowCPass(!ShowCPass) }}></i>
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
                        <input type="text" className="form-control inp" placeholder="" value={Number} onChange={(e) => { setNumber(e.target.value) }} />
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

                    {/* detailed address */}
                    <div className="col-md-12">
                        <label className='para-sm clr-text mt-4' htmlFor="">Address  </label>
                        <textarea type="text" className="form-control  area" rows={'3'} placeholder="" value={Address} onChange={(e) => { setAddress(e.target.value) }} />
                        {Error ? Address === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                    </div>

                    {/* current institute */}
                    <div className="col-md-6">
                        <label className='para-sm clr-text mt-4' htmlFor="">Current institute  </label>
                        <input type="text" className="form-control inp" placeholder="" value={CInstitute} onChange={(e) => { setCInstitute(e.target.value) }} />
                        {Error ? CInstitute === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                    </div>

                    {/* current institute weburl*/}
                    <div className="col-md-6">
                        <label className='para-sm clr-text mt-4' htmlFor="">Current institute website  </label>
                        <input type="url" className="form-control inp" placeholder="" value={CInstituteweb} onChange={(e) => { setCInstituteweb(e.target.value) }} />
                        {Error ? CInstituteweb === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                    </div>

                    {/* job title */}
                    <div className="col-md-6">
                        <label className='para-sm clr-text mt-4' htmlFor="">Job title</label>
                        <select name="" className='form-select slct' id="" onChange={(e) => { setjobtitle(e.target.value) }} value={jobtitle}>
                            <option value='' selected hidden>--select Job Title --</option>
                            {JobType?.data?.data?.map((item, i) => (
                                <>
                                    <option value={item.id}>{item.name}</option>
                                </>
                            ))}
                        </select>
                        {Error ? jobtitle === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                    </div>
                </div>


                <button type='submit' className='btn primary-btn mt-4 w-100'><p>Complete Sign Up {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>

            </form>
        </>
    )
}

export default CoachRegistration