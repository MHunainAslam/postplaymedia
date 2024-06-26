'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import { Select, message } from 'antd'

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
    const [Position, setPosition] = useState('')
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
        if (UserName === '' || Email === '' || Password === '' || C_Password === '' || Name === '' || Address === '' || CInstitute === '' || CInstituteweb === '' || jobtitle === '' || state === '' || city === '' || Position === '') {
            setError(true)
        }
        else {
            setisLoading(true)
            axios.post(`${APP_URL}/api/register`, { name: Name, username: UserName, email: Email, password: Password, c_password: C_Password, role_id: RoleId, phone: Number, address: Address, current_institute: CInstitute, current_ins_website: CInstituteweb, job_title: jobtitle, class_year: null, height: null, weight: null, sports: null, position: Position, travel_team_name: null, city: city, country: 'United States', })
                .then(response => {
                    // Handle successful response here
                    message.success(response.data.message)
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
                setAllcity(response?.data?.data)
                setcity('')
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
    const filterOption = (input, option) =>
        (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
    const changestate = (value) => {
        setstate(value)
    }
    const changecity = (value) => {
        setcity(value)
    }
    return (
        <>
            <form action="" onSubmit={CoachRegistrationSubmit}>
                <p className='heading text-center  text-dark'> <i className="bi bi-arrow-left backbtn" onClick={back}></i>Coach Account Details</p>
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
                        <label className='para-sm clr-text mt-4' htmlFor="">Contact Number (optional)</label>
                        <input type="text" className="form-control inp" onKeyPress={(e) => !/[+0-9]/.test(e.key) && e.preventDefault()} placeholder="" value={Number} onChange={(e) => { setNumber(e.target.value) }} />
                    </div>

                    {/* state */}
                    <div className="col-md-6">
                        <label className='para-sm clr-text mt-4' htmlFor="">State  </label>
                        {/* <select name="" className='form-select slct' id="" value={state} onChange={(e) => { setstate(e.target.value) }}>
                            <option value='' selected hidden>select State</option>
                            {Allstate?.map((item, i) => (
                                <option value={item.name} key={i}>{item.name}</option>
                            ))}
                        </select> */}
                        <Select
                            className='slct2'
                            showSearch
                            placeholder="Select State"
                            optionFilterProp="children"
                            onChange={changestate}
                            value={state}
                            // onSearch={onSearch}
                            filterOption={filterOption}
                            options={Allstate?.map(person => ({
                                value: person.name, // Assuming you want to use `name` as the value too
                                label: person.name, // This will be displayed in the dropdown
                            }))}
                        />

                        {Error ? state === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                    </div>

                    {/* city */}
                    <div className="col-md-6">
                        <label className='para-sm clr-text mt-4' htmlFor="">City  </label>
                        {/* <select name="" className='form-select slct' id="" value={city} onChange={(e) => { setcity(e.target.value) }}>
                            <option value='' selected hidden>select City</option>
                            {Allcity.length === 0 ?
                                <option value=''>No City Available</option>
                                :
                                <>
                                    {Allcity?.map((item, i) => (
                                        <option value={item} key={i}>{item}</option>
                                    ))}
                                </>}
                        </select> */}
                        <Select
                            className='slct2'
                            showSearch
                            placeholder="Select City"
                            optionFilterProp="children"
                            onChange={changecity}
                            value={city}
                            // onSearch={onSearch}
                            filterOption={filterOption}
                            options={Allcity?.map(person => ({
                                value: person, // Assuming you want to use `name` as the value too
                                label: person, // This will be displayed in the dropdown
                            }))}
                        />
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
                        <label className='para-sm clr-text mt-4' htmlFor="">NCAA ID  </label>
                        <input type="text" className="form-control inp" placeholder="" value={CInstituteweb} onChange={(e) => { setCInstituteweb(e.target.value) }} />
                        {/* <input type="url" className="form-control inp" onBlur={CInstituteweb === '' ? (e) => { setCInstituteweb(e.target.value) } : checkURL} placeholder="" value={CInstituteweb} onChange={(e) => { setCInstituteweb(e.target.value) }} /> */}
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


                </div>


                <button type='submit' className='btn primary-btn mt-4 w-100'><p>Complete Sign Up {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>

            </form>
        </>
    )
}

export default CoachRegistration