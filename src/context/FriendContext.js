// DataContext.js
"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { APP_URL } from "../../config";
import { GetToken } from "@/utils/Token";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";
import Login from "@/app/page";
const FrndContext = createContext({
    hello: 'world',
});

export function FrndWrapper({ children }) {
    const FrndContainerRef = useRef(null);
    const token = GetToken('userdetail')
    const router = useRouter
    const [UserProfiledata, setUserProfiledata] = useState()
    const [UserProfileloader, setUserProfileloader] = useState(true)
    const [frnd, setfrnd] = useState(false)
    const [state, setState] = useState({
        hello: 'UserProfiledata',
    });
    const [loading, setLoading] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(1)
    const [TotalPagesfrnd, setTotalPagesfrnd] = useState()
    const [Datafrnd, setDatafrnd] = useState([])
    const [totalMemberfrnd, settotalMemberfrnd] = useState(1)
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const fetchFrnds = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/friendships?per_page=25&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );
            const data = await response.json();
            if (data.success) {
                // Prepend new messages to the beginning of the array
                console.log('fetchfrnds', data)
                setDatafrnd(data.message.data);
                setCurrentPage(data.message.current_page);
                setTotalPagesfrnd(data.message.last_page);
                settotalMemberfrnd(data.message.total);
                setUserDataLoader(false)
            } else {
                console.error('Failed to fetch messages');
                setUserDataLoader(false)
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            setUserDataLoader(false)
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
        } finally {
            setLoading(false);
            setUserDataLoader(false)
        }
    };
    const fetchFrndss = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/friendships?per_page=10&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                // Prepend new messages to the beginning of the array

                setDatafrnd((prevMessages) => [...prevMessages, ...data?.message?.data]);
                setCurrentPage(data.message.current_page);
                setTotalPagesfrnd(data.message.last_page);
                console.log('data', data.message.current_page)
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
        } finally {
            setLoading(false);

        }
    };
    const handleLoadMore = () => {

        if (CurrentPage < TotalPagesfrnd) {
            setLoading(true);
            fetchFrndss(CurrentPage + 1);
        }
    };
    useEffect(() => {
        if (localStorage.getItem('userdetail')) {
            setfrnd(true)
        }
    }, [])
    // const handleScroll = () => {
    //     const container = FrndContainerRef.current;

    //     // Check if the user has scrolled to the bottom of the div
    //     // if (container && container.scrollTop <= 200) {
    //     if (container &&
    //         container.scrollHeight - container.scrollTop <= container.clientHeight - 0) {
    //         console.log('hn')
    //         handleLoadMore();
    //     }
    // };
    // useEffect(() => {
    //     const container = FrndContainerRef.current;
    //     container.addEventListener('scroll', handleScroll);
    //     return () => {
    //         container.removeEventListener('scroll', handleScroll);
    //     };
    // }, [handleScroll]);
    useEffect(() => {
        if (frnd) {

            if (CurrentPage === 1 && Datafrnd.length === 0) {
                fetchFrnds(CurrentPage);
            }
        }

    }, [CurrentPage, token])

    useEffect(() => {
        if (frnd) {
            // getallfrnds()
            fetchFrnds()
        }
    }, [frnd])


    return <FrndContext.Provider value={{ Datafrnd, setfrnd, FrndContainerRef, handleLoadMore, fetchFrnds, totalMemberfrnd }}>{children}</FrndContext.Provider>;
}

export function useFrndContext() {
    return useContext(FrndContext);
}

export default function Home() {
    const contextValue = useFrndContext();

    return (
        <div>
            <p>{contextValue.hello}</p>
            {/* Your other components */}
        </div>
    );
}