// pages/chat.js
import { GetToken, imgurl } from '@/utils/Token';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import StartChat from './StartChat';

const Chat = ({ TabState }) => {
    const token = GetToken('userdetail');
    const searchParams = useSearchParams()
    const profile = JSON.parse(searchParams.get('profile'))

    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setfirstLoad] = useState(false);

    const [firstRun, setFirstRun] = useState(true);
    const chatContainerRef = useRef();
    const previousScrollHeightRef = useRef();

    const fetchMessages = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://api.microndeveloper.com/api/messages?room_id=${TabState}&per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );
            const data = await response.json();
            const newMessages = data.data.data;

            // Save the previous scroll height before adding new messages
            previousScrollHeightRef.current = chatContainerRef.current.scrollHeight;

            setMessages(newMessages);
            setCurrentPage(data.data.current_page);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchMessagess = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://api.microndeveloper.com/api/messages?room_id=${TabState}&per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );
            const data = await response.json();
            const newMessages = data.data.data;

            // Save the previous scroll height before adding new messages
            previousScrollHeightRef.current = chatContainerRef.current.scrollHeight;

            setMessages((prevMessages) => [...newMessages, ...prevMessages]);
            setCurrentPage(data.data.current_page);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages(currentPage);
    }, []);

    useEffect(() => {
        if (firstRun) {
            const container = chatContainerRef.current;
            container.scrollTop = container.scrollHeight;
        } else {


            // Calculate the difference in scroll height after adding new messages
            const newScrollHeight = chatContainerRef.current.scrollHeight;
            const scrollHeightDifference = newScrollHeight - previousScrollHeightRef.current - 40;

            // Adjust the scroll position to maintain the previous scroll position
            chatContainerRef.current.scrollTop += scrollHeightDifference;
        }
    }, [messages]);

    const loadMore = () => {
        const nextPage = currentPage + 1;
        fetchMessagess(nextPage);
    };
    const handleScroll = () => {
        const container = chatContainerRef.current;

        // Check if the user has scrolled to the bottom of the div
        if (container && container.scrollTop <= 0) {
            setFirstRun(false)
            // if (container &&
            //     container.scrollHeight - container.scrollTop <= container.clientHeight + 200) {
            loadMore();
            // setfir(false);
        }
    };

    useEffect(() => {
        const container = chatContainerRef.current;

        // Add scroll event listener when the component mounts
        container.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    useEffect(() => {
        setMessages([])
        fetchMessages()
        setFirstRun(true)
    }, [TabState])
    const appendCustomDay = (e) => {
        e.preventDefault()
        if (NewMessages === '') {
        } else {
            const newMessage = { body: NewMessages, created_at: new Date().toLocaleString(), sender: { profile_photo: Userprofile ? { url: Userprofile?.url } : null } }; // 
            console.log(newMessage)
            setMessages((prevMessages) => [newMessage, ...prevMessages]);

            axios.post(`${APP_URL}/api/messages`, { body: NewMessages, room_id: TabState }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    console.log('msg send', response);


                })
                .catch(error => {
                    console.error(error);
                    if (error?.response?.status === 401) {
                        router.push('/')
                        deleteCookie('logged');
                        localStorage.removeItem('userdetail')
                    }
                });
            setNewMessages('')
            console.log(newMessage)
        }
    };

    return (
        <>
            {/* <div className='px-3 chat-header'>

                <Link href={`/people/${profile?.id}/activity`} className="d-flex align-items-center py-1 text-decoration-none">
                    <div className="MsgIcon MsgIconActive ">
                        {profile?.profile_photo === null ?
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                            <Image loader={imgurl} src={profile?.profile_photo?.url} alt="" width={100} height={100}></Image>
                        }
                    </div>
                    <p className="para text-black fw-bold mb-0 text-capitalize">{profile?.name}</p>
                </Link>
            </div> */}
            {loading && <p>Loading...</p>}
            <div className='flex-1 chat-body px-0 py-0' >
                <div className="h-100 overflow-auto" ref={chatContainerRef}>

                    {TabState === 'startchating' ? <StartChat profile={profile} /> : <>
                        {firstLoad ?
                            <div className="d-flex h-100 align-items-center">
                                <div className='border-bottom-dashed w-100'></div>
                                <p className='text-center my-auto px-4'>Loading </p>
                                <div className='border-bottom-dashed w-100'></div>
                            </div>
                            : <>


                                {messages?.map((item, i) => {
                                    const date = new Date(item.created_at);
                                    const formattedDate = date.toLocaleString();
                                    const uniqueKey = `${item.sender_id}-${formattedDate}-${i}`;
                                    return <div className={`d-flex py-1 text-decoration-none ${profile.id != item.sender_id ? ' flex-row-reverse' : ''}`} key={uniqueKey}>
                                        <Link href={`${profile.id === item.sender_id ? `/people/${profile?.id}/activity` : '/profile/profile'} `} className="MsgIcon  ">
                                            {profile.id != item.sender_id ?
                                                <>

                                                    {item?.sender?.profile_photo == null ?
                                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                                                        <Image loader={imgurl} src={item?.sender?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                    }

                                                </>
                                                : <>

                                                    {profile?.profile_photo == null ?
                                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                                                        <Image loader={imgurl} src={profile?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                    }
                                                </>}
                                        </Link>
                                        <div className={` ${profile.id != item.sender_id ? 'message-box-user' : 'message-box'}`}>
                                            <p className="para mb-0 me-2">{item.body}</p>
                                            <p className="para-sm clr-light mb-0 send">{formattedDate} </p>
                                        </div>
                                    </div>
                                })}

                            </>}
                    </>}

                </div>


            </div>
            {/* 
            <div className='p-3 chat-footer'>
                {TabState != 'startchating' ?
                    <form className="input-group mb-3 chat-box" onSubmit={appendCustomDay}>
                        <input type="text" className="form-control" id="" value={NewMessages} onChange={(e) => setNewMessages(e.target.value)} />
                        <button className="input-group-text " type='submit'><i className="bi bi-send"></i></button>
                    </form>
                    : ''}
            </div> */}
            {/* <button onClick={loadMore} disabled={loading}>
                Load More
            </button> */}
        </>
    );
};

export default Chat;
