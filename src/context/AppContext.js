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


  useEffect(() => {
    if (login) {


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
        console.log('recent chat', response);
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
    }
  }, [login])



  return <AppContext.Provider value={{ UserProfiledata, UserProfileloader, setlogin, receivefrndreq, FrndReq, receivegrpreq, GrpReq, recentchat, recentchatfunc, spamchatfunc, spamchat }}>{children}</AppContext.Provider>;
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