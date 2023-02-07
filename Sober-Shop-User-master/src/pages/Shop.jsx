import React from 'react'
import Header from '../components/Header/Header'
import NewBanner from '../components/Banner/NewBanner/NewBanner'
import ShopBody from '../components/Shop/ShopBody/ShopBody'
import newsbanner from '../assets/images/newsbanner.jpg'
import Footer from 'layout/Footer/Footer'

export default function Shop() {
    return (
        <div>
            <Header/>
            <NewBanner backgroundImg={newsbanner} title="Shop"/>
            <ShopBody />
            <Footer />
        </div>
    )
}
