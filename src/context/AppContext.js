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
  const router = useRouter
  const [UserProfiledata, setUserProfiledata] = useState()
  const [UserProfileloader, setUserProfileloader] = useState(true)
  const [state, setState] = useState({
    hello: UserProfiledata,
  });
  useEffect(() => {
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
        console.error(error);
        if (error?.response?.status === 401) {
          router.push('/')
          deleteCookie('logged');
          localStorage.removeItem('userdetail')
        }
      });
  }, [])
  return <AppContext.Provider value={{ UserProfiledata, UserProfileloader }}>{children}</AppContext.Provider>;
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