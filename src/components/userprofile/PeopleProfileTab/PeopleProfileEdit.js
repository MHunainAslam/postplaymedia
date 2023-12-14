'use client'
import { GetToken } from '@/utils/Token'
import { DatePicker, message } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { APP_URL } from '../../../../config'
import { UserContext } from '@/app/UserProfileLayout'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

const PeopleProfileEdit = ({ }) => {
    const token = GetToken('userdetail')
    const { Userdata } = useContext(UserContext);
    const [Name, setName] = useState()
    const [DateofBirth, setDateofBirth] = useState()
    const [MemberType, setMemberType] = useState()
    const [JobType, setJobType] = useState()
    const [Country, setCountry] = useState()
    const [City, setCity] = useState()
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
    console.log(Userdata?.data?.role?.id?.toString(), 'lol')
    return (
        <>
            <p className="heading mt-3 clr-text">Edit Profile</p>

            <div className="border-bottom mb-4"></div>

            <form action="" onSubmit={Userdata?.data?.role?.slug != 'athlete' ? EditcoachProfile : EditAthleteProfile} className='job-detail'>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Name </label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Date of Birth </label>
                    <div className="col">
                        <DatePicker onChange={onChange} className='inp' />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Sex </label>
                    <div className="col">
                        <input type="radio" name="gender" className='form-check-input me-2' id="male" value={'male'} onChange={handlegender} />
                        <label htmlFor="male" className='para clr-text'>Male</label>
                        <input type="radio" name="gender" className='form-check-input mx-2' id="female" value={'female'} onChange={handlegender} />
                        <label htmlFor="female" className='para clr-text'>Female</label>
                        <input type="radio" name="gender" className='form-check-input mx-2' id="others" value={'others'} onChange={handlegender} />
                        <label htmlFor="others" className='para clr-text'>others</label>
                    </div>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>City </label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={City} onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Country </label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={Country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Current institute </label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={C_institute} onChange={(e) => setC_institute(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Current institute website</label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={C_instituteweb} onChange={(e) => setC_instituteweb(e.target.value)} />
                    </div>
                </div>
                {Userdata?.data?.role?.slug != 'athlete' ?
                    <div className='d-md-flex align-items-center my-3'>
                        <label htmlFor="" className='col-md-2'>Job Type </label>
                        <div className="col">
                            <select name="" className='slct form-select' id="" value={JobType} onChange={(e) => setJobType(e.target.value)}>
                                <option hidden value=''>Change Job Type</option>
                                {getRoles?.data?.map((item, i) => (
                                    <option value={item.id} key={i}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    :
                    <>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Class Year</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={classyear} onChange={(e) => setclassyear(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Height</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={height} onChange={(e) => setheight(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Weight</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={weight} onChange={(e) => setweight(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>Sports </label>
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
                            <label htmlFor="" className='col-md-2'>Position</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={Position} onChange={(e) => setPosition(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-md-2'>AAU/Travel Team Name</label>
                            <div className="col">
                                <input type="text" name="" id="" className='form-control inp col-m' value={AAUTravel} onChange={(e) => setAAUTravel(e.target.value)} />
                            </div>
                        </div>
                    </>
                }
                <button type='submit' className='btn primary-btn mt-3' ><p className='px-3'>Save Changes {isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p> </button>
            </form>
        </>
    )
}

export default PeopleProfileEdit