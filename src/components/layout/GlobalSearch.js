import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../config';
import axios from 'axios';
import { GetToken, imgurl } from '@/utils/Token';
import { deleteCookie } from 'cookies-next';
import { useAppContext } from '@/context/AppContext';

const GlobalSearch = () => {
    const router = useRouter()
    const { UserProfiledata } = useAppContext()
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
        axios.get(`${APP_URL}/api/global-search?search=${inputValue}`, {
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
    }, [inputValue])


    const listItems = ['Item 1', 'Item 2', 'Item 3']; // Example list items

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setShowList(e.target.value !== '');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prevIndex) => (prevIndex < global.length - 1 ? prevIndex + 1 : prevIndex));
            scrollToActiveItem();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
            scrollToActiveItem();
        } else if (e.key === 'Enter' && activeIndex !== -1) {
            const selectedItem = global[activeIndex];
            const route = selectedItem.type === 'group' ? `/groups/${selectedItem.id}` : 
            `${UserProfiledata.data.id == selectedItem.id ? '/profile/activity' : `/people/${selectedItem.id}/activity`}`;
            router.push(route);
        }
    };
    const scrollToActiveItem = () => {
        const activeElement = document.querySelector('.global-search-dd .active');
        if (activeElement) {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
                        <ul className='global-search-dd' onKeyDown={handleKeyDown} tabIndex="0">
                            {global.map((item, index) => (
                                <li key={index}

                                    onClick={() => router.push(`${item.type == 'group' ? `/groups/${item?.id}` :
                                    `${UserProfiledata.data.id == item?.id ? '/profile/activity' : `/people/${item?.id}/activity`}`}`
                                    )}
                                    className={activeIndex === index ? 'active' : ''}>
                                    <div className="d-flex align-items-center">
                                        {item.image == '' ?
                                            <img src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm  d-block me-2 object-fit-cover'></img>
                                            : <img src={IMG_URL + item.image} alt="" width={100} height={100} className='post-profile-sm  d-block me-2 object-fit-cover'></img>
                                        }
                                        {item.name}
                                    </div>
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