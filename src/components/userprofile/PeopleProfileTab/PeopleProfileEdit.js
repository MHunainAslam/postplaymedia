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
    const [Country, setCountry] = useState()
    const [City, setCity] = useState()
    const [Sex, setSex] = useState()
    const [getRoles, setgetRoles] = useState([])
    const [isloading, setisloading] = useState(false)
    const router = useRouter()
    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setDateofBirth(date)
    };
    useEffect(() => {
        axios.get(`${APP_URL}/api/roles`, {
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
                if (error.response.status === 401) {
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

    const EditProfile = (e) => {
        setisloading(true)
        e.preventDefault()
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { name: Name, email: Userdata?.data?.email, role_id: Userdata.data.role.id.toString(), dob: DateofBirth, gender: Sex, city: City, country: Country, }, {
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
                if (error.response.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setisloading(false)


            });
    }
    console.log(Userdata?.data?.role?.id?.toString(), 'lol')
    return (
        <>
            <p className="heading mt-3 clr-text">Edit Profile</p>

            <div className="border-bottom mb-4"></div>

            <form action="" onSubmit={EditProfile} className='job-detail'>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Name </label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                {/* <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Member Type </label>
                    <div className="col">
                        <select name="" className='slct form-select' id="" value={MemberType} onChange={(e) => setMemberType(e.target.value)}>
                            {getRoles?.data?.map((item, i) => (
                                <option value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div> */}
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
                <button type='submit' className='btn primary-btn mt-3' ><p className='px-3'>Save Changes {isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p> </button>
            </form>
        </>
    )
}

export default PeopleProfileEdit