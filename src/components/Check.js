'use client'
import { DataContext } from '@/context/AppContext';
import React, { useContext } from 'react'

const Check = () => {
    const{ data } = useContext(DataContext);

    return (
        <div>Check {data}</div>
    )
}

export default Check