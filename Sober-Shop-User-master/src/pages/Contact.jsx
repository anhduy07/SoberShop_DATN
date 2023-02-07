import React from 'react'
import NewBanner from 'components/Banner/NewBanner/NewBanner'
import ContactUs from 'components/Contact/ContactUs/ContactUs'
import Header from 'components/Header/Header'
import contact from '../assets/images/contact.jpg' 
import New from 'layout/Newsletter/New'
import Footer from 'layout/Footer/Footer'

export default function Contact() {
    return (
        <div className="Contact">
            <Header/>
            <NewBanner backgroundImg={contact} title="Contact" />
            <ContactUs/>
            <New/>
            <Footer/>
        </div>
    )
}
