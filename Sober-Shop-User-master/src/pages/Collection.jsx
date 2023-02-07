import React from 'react'
import NewBanner from '../components/Banner/NewBanner/NewBanner'
import CollectionList from '../components/Collection/CollectionList/CollectionList'
import Header from '../components/Header/Header'
import newsbanner from '../assets/images/newsbanner.jpg'
import Footer from 'layout/Footer/Footer'

export default function Collection() {
    return (
        <div className="Collection">
            <Header/>
            <NewBanner backgroundImg={newsbanner} title="Collection"/>
            <CollectionList />
            <Footer />
        </div>
    )
}
