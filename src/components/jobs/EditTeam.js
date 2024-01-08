import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import { GetToken } from '@/utils/Token'
import { message } from 'antd'
import conferencefield from '../../utils/Confrences.json'

const EditTeam = ({ EditTeamID, setdlt, dlt }) => {
    const token = GetToken('userdetail')
    const [isLoading, setisLoading] = useState(false)
    const [name, setname] = useState('')
    const [Logo, setLogo] = useState('')
    const [desc, setdesc] = useState('')
    const [teamWeb, setteamWeb] = useState('')
    const [level, setlevel] = useState('')
    const [conference, setconference] = useState('')
    const [sports, setsports] = useState('')
    const [states, setstates] = useState('')
    const [Allstate, setAllstate] = useState([])
    const [Allcity, setAllcity] = useState([])
    const [city, setcity] = useState('')
    const [ProfileImage, setProfileImage] = useState('')
    const handleImageChange = (e) => {
        const formDataimg = new FormData();
        formDataimg.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onload = () => {
                setisLoading(true)
                setProfileImage(reader.result);
                console.log(e.target.files[0])
                axios.post(`${APP_URL}/api/post-media`, formDataimg, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        console.log('img', response);
                        setLogo(response?.data?.data?.last_inserted_id)
                        setisLoading(false)

                    })
                    .catch(error => {
                        console.error(error);
                        message.error(error?.response.data?.message)
                        if (error?.response?.status === 401) {
                            router.push('/')
                            deleteCookie('logged');
                            localStorage.removeItem('userdetail')
                        }
                    });

            };
            reader.readAsDataURL(file);
        }
    };


    const createAteam = (e) => {
        e.preventDefault()

        if (name === '' || Logo === '' || desc === '' || level === '' || conference === '' || sports === '' || states === '' || city === '' || teamWeb === '') {
            message.error('All Fields Are Required!')
        } else {
            setisLoading(true)
            axios.put(`${APP_URL}/api/teams/${EditTeamID}`, { name: name, description: desc, city: city, state: states, country: 'United States', image: Logo, level: level, conference: conference, sports: sports, roster: null, alumni: '0' }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    document.querySelector('.closeteamedit').click()
                    console.log('img', response);
                    setLogo('')
                    setProfileImage('')
                    setisLoading(false)
                    setname('')
                    setLogo('')
                    setdesc('')
                    setlevel('')
                    setconference('')
                    setsports('')
                    setstates('')
                    setcity('')
                    setdlt(!dlt)

                    message.success(response?.data?.message)
                })
                .catch(error => {
                    console.error(error);
                    setisLoading(false)
                    message.error(error?.response.data?.message)
                    if (error?.response?.status === 401) {
                        router.push('/')
                        deleteCookie('logged');
                        localStorage.removeItem('userdetail')
                    }
                });
        }
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
                console.log('kikikiki', response);
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
            "state": states
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
    }, [states])
    return (
        <>


            <div className="modal fade" id="editTeam" tabIndex="-1" aria-labelledby="editTeamLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <form onSubmit={createAteam} className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editTeamLabel">Edit Team </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>Name </label>
                                <div className="col">
                                    <input type="text" name="" id="" className='form-control inp col-m' value={name} onChange={(e) => setname(e.target.value)} />
                                </div>
                            </div>
                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>Logo </label>
                                <div className="col">
                                    <input type="file" name="" id="" className='form-control inp col-m' onChange={handleImageChange} />
                                </div>
                            </div>
                            {ProfileImage && (
                                <div className='d-md-flex align-items-center my-3'>
                                    <label htmlFor="" className='col-md-2'></label>
                                    <>
                                        <div className=' text-center img-preview mt-4 w-fit-content px-4'>
                                            <Image className=' rounded-0 my-3 object-fit-contain  max-w-100' src={ProfileImage} alt="Selected" height={100} width={100} />
                                        </div>

                                    </>
                                </div>
                            )}

                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>Team Website </label>
                                <div className="col">
                                    <input type="text" name="" id="" className='form-control inp col-m' value={teamWeb} onChange={(e) => setteamWeb(e.target.value)} />
                                </div>
                            </div>
                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>Description </label>
                                <div className="col">
                                    <textarea rows={3} type="text" name="" id="" className='form-control inp col-m' value={desc} onChange={(e) => setdesc(e.target.value)} />
                                </div>
                            </div>
                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>Level </label>
                                <div className="col">
                                    <select name="" className='form-select slct' id="" value={level} onChange={(e) => setlevel(e.target.value)}>
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

                                </div>
                            </div>
                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>Conference </label>
                                <div className="col">
                                    <select name="" className='form-select slct' id="" value={conference} onChange={(e) => setconference(e.target.value)}>
                                        <option value='' selected hidden>Conference</option>
                                        {conferencefield?.confrences.map((item, i) => (
                                            <option value={item.value} key={i}>{item.name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>Sports </label>
                                <div className="col">
                                    <select name="" className='form-select slct' id="" value={sports} onChange={(e) => setsports(e.target.value)}>
                                        <option value='' selected hidden>--select Sports--</option>
                                        <option value='Boys Basketball'>Boys Basketball</option>
                                        <option value='Girls Basketball'>Girls Basketball</option>
                                        <option value='Boys Baseball'>Baseball</option>
                                        <option value='Girls Football'>Football</option>
                                    </select>

                                </div>
                            </div>
                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>State </label>
                                <div className="col">
                                    <select name="" className='form-select slct' id="" value={states} onChange={(e) => { setstates(e.target.value) }}>
                                        <option value='' selected hidden>select State</option>
                                        {Allstate?.map((item, i) => (
                                            <option value={item.name} key={i}>{item.name}</option>
                                        ))}
                                        {/* <option value='city2'>State 2</option> */}
                                    </select>

                                </div>
                            </div>
                            <div className='d-md-flex align-items-center my-3'>
                                <label htmlFor="" className='col-md-2'>City </label>
                                <div className="col">
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
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn primary-btn px-3 closeteamedit" data-bs-dismiss="modal"><p>Close</p></button>
                            <button type="submit" className="btn primary-btn px-3" disabled={isLoading}><p>Save {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default EditTeam