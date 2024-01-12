// components/ChatMessages.js
import { GetToken } from '@/utils/Token';
import { useState, useEffect, useRef } from 'react';

const Chat = ({ }) => {
    const token = GetToken('userdetail')
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null); // Create a ref for the scroll container

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://api.microndeveloper.com/api/messages?room_id=5&per_page=20&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include your API token here
                },
            });
            const data = await response.json();

            console.log('Received data:', data);

            if (Array.isArray(data.data.data)) {
                setMessages(data.data.data);
                setPage(data.data.current_page + 1);
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchMessagess = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://api.microndeveloper.com/api/messages?room_id=5&per_page=20&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include your API token here
                },
            });
            const data = await response.json();

            console.log('Received data:', data);

            if (Array.isArray(data.data.data)) {
                setMessages((prevMessages) => [...data.data.data, ...prevMessages]);
                setPage(data.data.current_page + 1);
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop === 0 && !loading) {
            fetchMessagess();
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    return (
        <>
            <div className='flex-1 chat-body px-0 py-0' >
                <div ref={containerRef} className="h-100 overflow-auto">
                    {messages.map((message) => (
                        <div key={message.id}>
                            {/* Render your message here */}
                            {message.body}
                        </div>
                    ))}
                    {loading && <p>Loading...</p>}
                </div>
            </div>
        </>
    );
};

export default Chat;
