import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { APP_URL } from '../../../config';
import axios from 'axios';
import { GetToken } from '@/utils/Token';
import { deleteCookie } from 'cookies-next';

const GlobalSearch = () => {
    const router = useRouter()
    const token = GetToken('userdetail')

    const data = [
        { name: 'aaaaaa' },
        { name: 'aaaaaa' },
        { name: 'aaaaaa' },
        { name: 'aaaaaa' },
        { name: 'aaaaaa' }
    ]
    const [inputValue, setInputValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [showList, setShowList] = useState(false);
    const [global, setglobal] = useState([])
    useEffect(() => {
        axios.get(`${APP_URL}/api/gloabl-search`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('global search', response);
                setglobal(response.data.data)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])


    const listItems = ['Item 1', 'Item 2', 'Item 3']; // Example list items

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setShowList(e.target.value !== '');
    };

    const handleKeyDown = (e, type, ids) => {
        // if (e.key === "Enter") {
        //     router.push(`${type == 'group' ? `/groups/${ids}` : `/people/${ids}/activity`}`)
        //     // Perform your action here
        // }
        if (e.key === 'ArrowDown') {
            setActiveIndex((prevIndex) => (prevIndex + 1) % global.length);
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prevIndex) => (prevIndex - 1 + global.length) % global.length);
        }
    };


    return (
        <>
            <div className="input-group header-search row">
                <div className='d-flex w-auto'>
                    <i className="bi bi-text-left clr-primary fs-4 d-md-none" data-bs-toggle="offcanvas" data-bs-target="#ActivitySidebar" aria-controls="ActivitySidebar"></i>
                    <span className="input-group-text border-0 bg-transparent" id="basic-addon1">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
                <div className='col'>
                    <input type="text"
                        className="form-control border-0 bg-transparent "
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search"
                    />

                    {showList &&
                        <ul className='global-search-dd'>
                            {global.map((item, index) => (
                                <li key={index}
                                    onKeyDown={() => handleKeyDown(item.name)}
                                    onClick={() => router.push(`${item.type == 'group' ? `/groups/${item?.id}` : `/people/${item?.id}/activity`}`)}
                                    className={activeIndex === index ? 'active' : ''}>
                                    {item.name}
                                </li>
                            ))}

                        </ul>
                    }
                </div>
            </div >
        </>
    )
}

export default GlobalSearch