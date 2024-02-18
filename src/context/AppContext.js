// DataContext.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { APP_URL } from "../../config";
import { GetToken } from "@/utils/Token";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//     const [data, setData] = useState(null);

//     return (
//         <DataContext.Provider value={{ data, setData }}>
//             {children}
//         </DataContext.Provider>
//     );
// };
const AppContext = createContext({
  hello: 'world',
});

export function AppWrapper({ children }) {
  const token = GetToken('userdetail')
  const router = useRouter()

  const [UserProfiledata, setUserProfiledata] = useState()
  const [UserProfileloader, setUserProfileloader] = useState(true)
  const [login, setlogin] = useState(false)
  const [FrndReq, setFrndReq] = useState([])
  const [recentchat, setrecentchat] = useState([])
  const [GrpReq, setGrpReq] = useState([])
  const [spamchat, setspamchat] = useState([])
  const [state, setState] = useState({
    hello: UserProfiledata,
  });
  useEffect(() => {
    if (localStorage.getItem('userdetail')) {
      setlogin(true)
    }
  }, [])

  const authme = () => {

    axios.get(`${APP_URL}/api/authMe`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log('context authMe', response);
        setUserProfiledata(response?.data)
        setUserProfileloader(false)

      })
      .catch(error => {
        // setUserProfileloader(false)
        // console.error(error);
        if (error?.response?.status === 401) {
          // router.replace('/')
          deleteCookie('logged');
          localStorage.removeItem('userdetail')
        }
      });
  }

  useEffect(() => {
    if (login) {
      authme()

    }
  }, [login])

  const receivefrndreq = () => {
    axios.get(`${APP_URL}/api/friend-requests/received`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log('frnd Req', response.data?.data);
        setFrndReq(response?.data?.data)


      })
      .catch(error => {

        // console.error(error);
        if (error?.response?.status === 401) {
          router?.push('/')
          deleteCookie('logged');
          localStorage.removeItem('userdetail')
        }
      });
  }
  const receivegrpreq = () => {
    axios.get(`${APP_URL}/api/groups/getAllRequests?status=pending`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log('grpReq', response.data?.data);
        setGrpReq(response?.data?.data?.data)


      })
      .catch(error => {

        console.error(error);
        if (error?.response?.status === 401) {
          router?.push('/')
          deleteCookie('logged');
          localStorage.removeItem('userdetail')
        }
      });
  }
  const recentchatfunc = () => {
    axios.get(`${APP_URL}/api/get-my-recent-chats?status=accepted`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        setrecentchat(response)
      })
      .catch(error => {
        console.error(error);
        if (error?.response?.status === 401) {
          router?.push('/')
          deleteCookie('logged');
          localStorage.removeItem('userdetail')
        }
      });
  }
  const spamchatfunc = () => {
    axios.get(`${APP_URL}/api/room?status=pending`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log('spam chat', response);
        setspamchat(response)
      })
      .catch(error => {
        // console.error(error);
        if (error?.response?.status === 401) {
          router?.push('/')
          deleteCookie('logged');
          localStorage.removeItem('userdetail')
        }
      });
  }
  const [Notifications, setNotifications] = useState([])

  const [totalMembernoti, settotalMembernoti] = useState(1)
  const [CurrentPageNoti, setCurrentPageNoti] = useState(1)
  const [TotalPagesnoti, setTotalPagesnoti] = useState()
  const [loading, setLoading] = useState(1)
  const fetchNoti = async (page) => {
    try {
      const response = await fetch(
        `${APP_URL}/api/get-notifications?is_read=false&per_page=15&page=${page}`,
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
        console.log('all noti', data);
        setNotifications(data.data.data)
        setCurrentPageNoti(data.data.current_page);
        setTotalPagesnoti(data.data.last_page);
        settotalMembernoti(data.data.total);

      } else {
        console.error('Failed to fetch notification');

      }
    } catch (error) {
      console.error('Error fetching notification', error);
      if (error?.response?.status === 401) {
        router.push('/')
        deleteCookie('logged');
        localStorage.removeItem('userdetail')
      }
    } finally {
    }
  };
  const fetchNotis = async (page) => {
    console.log('not');
    try {
      const response = await fetch(
        `${APP_URL}/api/get-notifications?is_read=false&per_page=20&page=${page}`,
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
        console.log('data noti', data)
        setNotifications((prevMessages) => [...prevMessages, ...data?.data?.data]);
        setCurrentPageNoti(data.data.current_page);
        setTotalPagesnoti(data.data.last_page);
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
  
  const handleLoadMorenoti = () => {
    if (CurrentPageNoti < TotalPagesnoti) {
      setLoading(true);
      fetchNotis(CurrentPageNoti + 1);
    }
  };
  useEffect(() => {
    if (login) {
      spamchatfunc()
    }
  }, [])


  useEffect(() => {
    if (login) {
      recentchatfunc()
      receivefrndreq()
      receivegrpreq()
      fetchNoti()
    }
  }, [login])



  return <AppContext.Provider value={{ Notifications, TotalPagesnoti, fetchNotis, CurrentPageNoti,handleLoadMorenoti, setLoading, fetchNoti, authme, UserProfiledata, UserProfileloader, setlogin, receivefrndreq, FrndReq, receivegrpreq, GrpReq, recentchat, recentchatfunc, spamchatfunc, spamchat }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}

export default function Home() {
  const contextValue = useAppContext();

  return (
    <div>
      <p>{contextValue.hello}</p>
      {/* Your other components */}
    </div>
  );
}