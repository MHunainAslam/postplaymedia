'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../config'
import axios from 'axios'
import Loader from '../Loader'
import { Authme, GetToken } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import conferencefield from '../../utils/Confrences.json'
import { message } from 'antd'
import EditTeam from './EditTeam'
import Pagination from './Pagination'
import { useAppContext } from '@/context/AppContext'
const AllTeams = ({ loadcomponent }) => {
    const token = GetToken('userdetail')
    const [Filter, setFilter] = useState(false)
    const [Conference, setConference] = useState('')
    const [Freelance, setFreelance] = useState(true)
    const [FullTime, setFullTime] = useState(true)
    const [Internship, setInternship] = useState(true)
    const [PartTime, setPartTime] = useState(true)
    const [Temporary, setTemporary] = useState(true)
    const [AllJobisLoader, setAllJobisLoader] = useState(true)
    const [SearchTitle, setSearchTitle] = useState('')
    const [Allstate, setAllstate] = useState([])
    const [Allcity, setAllcity] = useState([])
    const [GetAllJobs, setGetAllJobs] = useState([])
    const [state, setstate] = useState('')
    const [level, setlevel] = useState('')
    const [sports, setsports] = useState('')
    const [EditTeamID, setEditTeamID] = useState('')
    const [dlt, setdlt] = useState(true)
    const [dataOnPage, setdataOnPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [Search, setSearch] = useState('')
    const itemsPerPage = dataOnPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const a = parseInt(itemsPerPage);
    const b = parseInt(indexOfFirstItem);
    const router = useRouter()
    console.log(conferencefield)
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const [Userdata, setUserdata] = useState(UserProfiledata)

    useEffect(() => {
        setAllJobisLoader(true)
        axios.get(`${APP_URL}/api/teams?conference=${Conference}&state=${state}&level=${level}&sports=${sports}&per_page=${dataOnPage}&page=${currentPage}&search=${SearchTitle}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('alljobs', response);
                setGetAllJobs(response)
                setAllJobisLoader(false)

            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setAllJobisLoader(false)
            });
    }, [dlt, loadcomponent, Conference, state, level, sports, currentPage, SearchTitle])
    useEffect(() => {
      setCurrentPage(1)
    }, [Conference, state, level, sports])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // setisLoading(true)
        console.log(pageNumber);
    };

    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    const clearfilter = () => {
        setstate('')
        setConference('')
        setsports('')
        setlevel('')
    }
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

    const dltteam = (e) => {
        axios.delete(`${APP_URL}/api/teams/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response.data);
                message.success(response.data.message)
                setdlt(!dlt)
                console.log(dlt)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    // useEffect(() => {
    //     axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
    //         "country": "United States",
    //         "state": state
    //     }, {
    //         headers: {

    //             'X-RapidAPI-Key': 'c1c3fb6c0cmsh4907d3e33341dbbp1078c6jsnd4b7038ff1c5',
    //             'X-RapidAPI-Host': 'countries-states-cities-dataset.p.rapidapi.com'

    //         }
    //     })
    //         .then(response => {
    //             console.log('llll', response);
    //             setAllcity(response?.data?.data)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [state])
    return (
        <>



            <div className="border-bottom row justify-content-between">
                <div className="col-sm-8 col-lg-6">
                    <form className="  my-3">
                        <div className="d-flex">
                            <input type="text" className="form-control w-50 inp me-2 " placeholder="keywords" aria-label="Username" value={SearchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} />
                            {/* <input type="text" className="form-control inp me-2 " placeholder="Location" aria-label="Username" /> */}
                            <button className='btn primary-btn rounded-5 '><p><i className="bi bi-search"></i></p></button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-4 col-lg-6 my-3 text-sm-end">
                    <button className='btn secondary-btn px-4' onClick={() => { setFilter(!Filter) }}><i className="bi bi-sliders2-vertical" ></i> Filter</button>
                </div>
                {Filter ?
                    <div className="border-top row justify-content-between">
                        <div className="d-flex flex-wrap py-3 justify-content-center flex-wrap">
                            <div className='m-2'>
                                {/* <input className=' form-check-input' type="checkbox" name="" id="Freelance" value={'freelance'} onChange={(e => { setFreelance(!Freelance) })} checked={Freelance} /> */}
                                {/* <label className='para clr-text ms-2' htmlFor="Freelance"></label> */}
                                <select name="" className='form-select slct' id="" value={level} onChange={(e) => setlevel(e.target.value)}>
                                    <option value='' selected hidden>Level</option>
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
                            </div>
                            <div className='m-2'>
                                <select name="" className='form-select slct' id="" value={sports} onChange={(e) => setsports(e.target.value)}>
                                    <option value='' selected hidden>Sports</option>
                                    <option value='Boys Basketball'>Boys Basketball</option>
                                    <option value='Girls Basketball'>Girls Basketball</option>
                                    <option value='Boys Baseball'>Baseball</option>
                                    <option value='Football'>Football</option>
                                </select>
                            </div>
                            <div className='m-2'>
                                <select name="" className='form-select slct' id="" value={state} onChange={(e) => { setstate(e.target.value) }}>
                                    <option value='' selected hidden>select State</option>
                                    {Allstate?.map((item, i) => (
                                        <option value={item.name} key={i}>{item.name}</option>
                                    ))}
                                    {/* <option value='city2'>State 2</option> */}
                                </select>
                            </div>
                            <div className='m-2'>
                                <select name="" className='form-select slct' id="" value={Conference} onChange={(e) => setConference(e.target.value)}>
                                    <option value='' selected hidden>Conference</option>
                                    {conferencefield?.confrences.map((item, i) => (
                                        <option value={item.value} key={i}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="m-2">
                                <input type='button' className='form-control inp secondary-btn' onClick={clearfilter} value="Clear"></input>
                            </div>
                            {/* <div className='m-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Temporary" value={'Temporary'} onChange={(e => { setTemporary(!Temporary) })} checked={Temporary} />
                                <label className='para clr-text ms-2' htmlFor="Temporary">Temporary</label>
                            </div> */}
                        </div>
                    </div>
                    : ''}
            </div>
            <div className="position-relative">
                {AllJobisLoader ? <Loader /> : <>
                    {GetAllJobs?.data?.data?.data?.length === 0 ? <div className='text-center heading-m text-black my-5'>No Result Found </div> :
                        <>
                            {GetAllJobs?.data?.data?.data?.map((item, i) => (
                                <div className="card n-card my-4 py-3 " key={i} >
                                    <div className="row g-0">
                                        <div className="col-lg-1 col-md-2 text-center my-auto">
                                            {item.image === null ?
                                                <Image src={'/assets/images/avatar/img.png'} width={300} height={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="" />
                                                :
                                                <Image loader={imgurl} src={item.image.url} width={300} height={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="" />
                                            }
                                        </div>
                                        <div className="col-lg col-md">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <Link href={`${item.link}`} target='_blank' className="link-hov heading-m fw-bold text-black">{item.name}</Link>
                                                    {Userdata?.data?.role?.name === 'Admin' ?
                                                        <li className=" nav-item list-unstyled fw-bold fs-4 text-end ">
                                                            <Link className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </Link>
                                                            <ul className="dropdown-menu" style={{ zIndex: '9999' }}>
                                                                <li><Link className="dropdown-item" onClick={(e) => dltteam(item.id)} href="#">Delete</Link></li>
                                                                <li><Link data-bs-toggle="modal" data-bs-target="#editTeam" className="dropdown-item" href="#" onClick={() => setEditTeamID(item.id)} >Edit Team</Link></li>

                                                            </ul>
                                                        </li>
                                                        : ''}
                                                </div>
                                                <p className="card-text para clr-text my-3">{item.level} - {item.sports}</p>
                                                <p className="clr-primary para mb-0">{item.state} - {item.city}</p>

                                            </div>
                                        </div>
                                        {/* <div className="col-2  job-card-btn px-4 border-0">
                                            <p className=''>{item.job_type}</p>
                                           
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>
                }
                <Pagination
                    dataOnPage={dataOnPage}
                    currentPage={currentPage}
                    totalPages={Math.ceil(GetAllJobs?.data?.data?.total / itemsPerPage)}
                    tabledata={GetAllJobs?.data?.data?.data}
                    onPageChange={handlePageChange}
                    indexOfFirstItem={indexOfFirstItem}
                    // currentData={currentData}
                    itemsPerPage={itemsPerPage}
                    indexOfLastItem={indexOfLastItem}
                />
            </div>
            <EditTeam EditTeamID={EditTeamID} setdlt={setdlt} dlt={dlt} />
        </>
    )
}

export default AllTeams