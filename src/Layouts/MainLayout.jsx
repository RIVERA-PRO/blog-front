import React from 'react'
import Header from '../Pages/Header/Header'
import { Outlet } from "react-router-dom";
import ButonScroll from '../Components/ButonScroll/ButonScroll'

export default function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />

            <ButonScroll />
        </div>
    )
}
