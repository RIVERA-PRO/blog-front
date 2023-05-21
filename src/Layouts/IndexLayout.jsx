import React from 'react'
import Header from '../Pages/Header/Header'
import HeroPage from '../Pages/HeroPage/HeroPage'
import ButonScroll from '../Components/ButonScroll/ButonScroll'
import FooterPage from '../Pages/FooterPage/FooterPage'
import JobsPage from '../Pages/JobsPage/JobsPage'
import PageAllUsers from '../Pages/PageAllUsers/PageAllUsers'
import PagePublicaciones from '../Pages/PagePublicaciones/PagePublicaciones'
export default function IndexLayout() {
    return (
        <div>
            <Header />

            <PagePublicaciones />
        </div>
    )
}
