'use client'
import { GetToken } from '@/utils/Token'
import { DatePicker, message } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { APP_URL } from '../../../../config'
import { UserContext } from '@/app/UserProfileLayout'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

const Profiledetail = ({ }) => {
    const token = GetToken('userdetail')
    const { Userdata } = useContext(UserContext);
    const [Name, setName] = useState()
    const [number, setnumber] = useState()
    const [DateofBirth, setDateofBirth] = useState()
    const [MemberType, setMemberType] = useState()
    const [JobType, setJobType] = useState()
    const [Country, setCountry] = useState()
    const [City, setCity] = useState()
    const [Allcity, setAllcity] = useState()
    const [Address, setAddress] = useState()
    const [state, setstate] = useState()
    const [Allstate, setAllstate] = useState()
    const [Sex, setSex] = useState()
    const [classyear, setclassyear] = useState()
    const [height, setheight] = useState()
    const [weight, setweight] = useState()
    const [Sports, setSports] = useState()
    const [Position, setPosition] = useState()
    const [AAUTravel, setAAUTravel] = useState()
    const [C_institute, setC_institute] = useState()
    const [C_instituteweb, setC_instituteweb] = useState()
    const [getRoles, setgetRoles] = useState([])
    const [isloading, setisloading] = useState(false)
    const router = useRouter()
    console.log("first", Userdata)
    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setDateofBirth(date)
    };

    useEffect(() => {
        axios.get(`${APP_URL}/api/sub-roles`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('roles', response);
                setgetRoles(response?.data)
            })
            .catch(error => {
                console.error('roles', error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])

    const handlegender = (e) => {
        setSex(e.target.value)
        console.log(e.target.value)
    }
    const EditcoachProfile = (e) => {
        setisloading(true)
        e.preventDefault()
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { name: Name, email: Userdata?.data?.email, role_id: Userdata.data.role.id.toString(), dob: DateofBirth, gender: Sex, city: City, country: Country, JobType: JobType, C_institute: C_institute, C_instituteweb: C_instituteweb }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
                message.success(response.data?.message)
                router.push('/profile/activity')
                setisloading(false)
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setisloading(false)


            });
    }
    const EditAthleteProfile = (e) => {
        e.preventDefault()
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

    return (
        <>
            <p className="heading mt-3 clr-text">Profile</p>

            <div className="border-bottom mb-4"></div>

            <div className='job-detail'>
                <div className='d-md-flex align-items-center my-2'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Name </label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.name === null ? '--' : Userdata?.data?.name}
                    </p>
                </div>

                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Date of Birth </label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.dob === null ? '--' : Userdata?.data?.dob.slice(0, 10)}
                    </p>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Number </label>
                    <p className="para-lg text-dark mb-0" text-capitalize>
                        {Userdata?.data?.number === null ? '--' : Userdata?.data?.number}
                    </p>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Sex </label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.gender === null ? '--' : Userdata?.data?.gender}
                    </p>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>State </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.state === null ? '--' : Userdata?.data?.state}
                    </p>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>City </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.city === null ? '--' : Userdata?.data?.city}
                    </p>

                </div>

                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Address </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.address === null ? '--' : Userdata?.data?.address}
                    </p>


                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Current institute </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.current_institute == "" ? '--' : Userdata?.data?.current_institute}
                    </p>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Current institute website</label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {Userdata?.data?.current_ins_website === '' ? '--' : Userdata?.data?.current_ins_website}
                    </p>
                </div>
                {Userdata?.data?.role?.slug != 'athlete' ?
                    <div className='d-md-flex align-items-center my-3'>
                        <label htmlFor="" className='col-lg-4 col-md-6'>Job Title </label>
                        <p className="para-lg text-dark mb-0 text-capitalize">
                            {Userdata?.data?.job_title === '' ? '--' : Userdata?.data?.job_title}
                        </p>
                    </div>
                    :
                    <>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Class Year</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={classyear} onChange={(e) => setclassyear(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Height</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={height} onChange={(e) => setheight(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Weight</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={weight} onChange={(e) => setweight(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Sports </label>
                            <div className="col">
                                <select name="" className='slct form-select' id="" value={Sports} onChange={(e) => setSports(e.target.value)}>
                                    <option hidden value=''>Change Sports</option>
                                    <option value="BoysBasketball">Boys Basketball</option>
                                    <option value="GirlsBasketball">Girls Basketball</option>
                                    <option value="BoysBaseball">Baseball</option>
                                    <option value="GirlsFootball">Football</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Position</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={Position} onChange={(e) => setPosition(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>AAU/Travel Team Name</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={AAUTravel} onChange={(e) => setAAUTravel(e.target.value)} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Profiledetail
