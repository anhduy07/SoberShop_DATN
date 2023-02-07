import Footer from 'layout/Footer/Footer'
import New from 'layout/Newsletter/New'
import React from 'react'
import Banner from '../components/Banner/Main/Banner'
import RecommendBanner from '../components/Banner/RecommendBanner/RecommendBanner'
import Header from '../components/Header/Header'
import Carousel from '../features/Product/components/Carousel/Carousel'

export default function Home() {
    return (
        <div className="Home">
            <Header/>
            <Banner/>
            <RecommendBanner/>
            <Carousel/>
            <New />
            <Footer/>
        </div>
    )
}
