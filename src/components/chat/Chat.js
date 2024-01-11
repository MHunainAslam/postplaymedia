import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetToken } from '@/utils/Token';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState(GetToken('userdetail'));
    const chatContainerRef = useRef(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://api.microndeveloper.com/api/messages', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Add other headers if needed
                },
                params: {
                    room_id: 5,
                    per_page: 20,
                    page: 1,
                },
            });

            const newMessages = response.data.data.data;
            setMessages((prevMessages) => [...newMessages, ...prevMessages]);
            // Scroll to bottom after initial load
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };

    const fetchMoreMessages = async () => {
        try {
            const response = await axios.get('http://api.microndeveloper.com/api/messages', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Add other headers if needed
                },
                params: {
                    room_id: 5,
                    per_page: 20,
                    page: 2, // Change the page number as needed
                },
            });

            const newMessages = response.data.data.data;
            setMessages((prevMessages) => [...newMessages, ...prevMessages]);
        } catch (error) {
            console.error('Error fetching more chat messages:', error);
        }
    };

    const scrollToBottom = () => {
        const scrollHeight = chatContainerRef.current.scrollHeight;
        const height = chatContainerRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        chatContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

    const handleScroll = () => {
        const scrollTop = chatContainerRef.current.scrollTop;
        const scrollHeight = chatContainerRef.current.scrollHeight;
        const clientHeight = chatContainerRef.current.clientHeight;

        if (scrollTop === 0 && scrollTop < scrollHeight - clientHeight) {
            // Load more messages and prepend
            fetchMoreMessages();
        }
    };

    return (
        <div className='flex-1 chat-body px-0 py-0' >
            <div ref={chatContainerRef} className="h-100 overflow-auto" onScroll={handleScroll}>
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <div className="message-sender">{message.sender.name}</div>
                        <div className="message-body">{message.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
