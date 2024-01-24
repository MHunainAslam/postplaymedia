'use client'
import { GetToken } from '@/utils/Token'
import { DatePicker, message } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { APP_URL } from '../../../../config'
import { UserContext } from '@/app/UserProfileLayout'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import Loader from '@/components/Loader'
import { useAppContext } from '@/context/AppContext'

const Profiledetail = ({ }) => {
    const token = GetToken('userdetail')
    const { UserProfiledata, UserProfileloader } = useAppContext()
    
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
    const [getRoles, setgetRoles] = useState([])
    const [isloading, setisloading] = useState(true)
    const router = useRouter()

    useEffect(() => {

        axios.get(`${APP_URL}/api/sub-roles`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setgetRoles(response?.data)
                setisloading(false)
            })
            .catch(error => {
                console.error('roles', error);
                setisloading(false)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
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
            })
            .catch(error => {
                console.error(error);
            });
    }, [state])

    return (
        <>
            <p className="heading mt-3 clr-text">Profile</p>

            <div className="border-bottom mb-4"></div>

            <div className='job-detail position-relative'>

                <div className='d-md-flex align-items-center my-2'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Name </label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.name === null ? '--' : UserProfiledata?.data?.name}
                    </p>
                </div>

                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Date of Birth </label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.dob === null ? '--' : UserProfiledata?.data?.dob.slice(0, 10)}
                    </p>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Number </label>
                    <p className="para-lg text-dark mb-0" text-capitalize>
                        {UserProfiledata?.data?.number === null ? '--' : UserProfiledata?.data?.number}
                    </p>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Sex </label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.gender === null ? '--' : UserProfiledata?.data?.gender}
                    </p>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>State </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.state === null ? '--' : UserProfiledata?.data?.state}
                    </p>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>City </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.city === null ? '--' : UserProfiledata?.data?.city}
                    </p>

                </div>

                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Address </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.address === null ? '--' : UserProfiledata?.data?.address}
                    </p>


                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Current institute </label>

                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.current_institute == "" ? '--' : UserProfiledata?.data?.current_institute}
                    </p>

                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-lg-4 col-md-6'>Current institute website</label>
                    <p className="para-lg text-dark mb-0 text-capitalize">
                        {UserProfiledata?.data?.current_ins_website === '' ? '--' : UserProfiledata?.data?.current_ins_website}
                    </p>
                </div>
                {UserProfiledata?.data?.role?.slug != 'athlete' ?
                    <div className='d-md-flex align-items-center my-3'>
                        <label htmlFor="" className='col-lg-4 col-md-6'>Job Title </label>
                        <p className="para-lg text-dark mb-0 text-capitalize">
                            {UserProfiledata?.data?.sub_role?.name === null ? '--' : UserProfiledata?.data?.sub_role?.name}
                        </p>
                    </div>
                    :
                    <>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Class Year</label>
                            <p className="para-lg text-dark mb-0 text-capitalize">
                                {UserProfiledata?.data?.class_year === '' ? '--' : UserProfiledata?.data?.class_year}
                            </p>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Height</label>
                            <p className="para-lg text-dark mb-0 text-capitalize">
                                {UserProfiledata?.data?.height === '' ? '--' : UserProfiledata?.data?.height}
                            </p>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Weight</label>
                            <p className="para-lg text-dark mb-0 text-capitalize">
                                {UserProfiledata?.data?.weight === '' ? '--' : UserProfiledata?.data?.weight}
                            </p>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Sports </label>
                            <p className="para-lg text-dark mb-0 text-capitalize">
                                {UserProfiledata?.data?.sports === '' ? '--' : UserProfiledata?.data?.sports}
                            </p>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>Level</label>
                            <p className="para-lg text-dark mb-0 text-capitalize">
                                {UserProfiledata?.data?.position === '' ? '--' : UserProfiledata?.data?.position}
                            </p>
                        </div>
                        <div className='d-md-flex align-items-center my-3'>
                            <label htmlFor="" className='col-lg-4 col-md-6'>AAU/Travel Team Name</label>
                            <p className="para-lg text-dark mb-0 text-capitalize">
                                {UserProfiledata?.data?.travel_team_name === '' ? '--' : UserProfiledata?.data?.travel_team_name}
                            </p>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default Profiledetail
