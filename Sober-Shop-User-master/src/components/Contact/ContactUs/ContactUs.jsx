import React from 'react'
import { FaHome, FaMailBulk, FaPhone } from 'react-icons/fa'
import Map from '../Map/Map'
import './contact.scss'

export default function ContactUs() {
    return (
        <div className="ContactUs">
            <div className="contact-info">
                <div className="contact-info-title">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="contact-info-detail">
                    <div className="contact-info-item">
                        <FaHome className="contact-icon"/>
                        <p className="contact-info-title2">address</p>
                        <p>Ha Noi</p>
                    </div>
                    <div className="contact-info-item">
                        <FaPhone className="contact-icon"/>
                        <p className="contact-info-title2">phone</p>
                        <p>0354215421</p>
                    </div>
                    <div className="contact-info-item">
                        <FaMailBulk className="contact-icon"/>
                        <p className="contact-info-title2">email</p>
                        <p>admin@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="getintouch">
                <div className="getintouch-map">
                    <Map/>
                </div>
                <form className="getintouch-form" onSubmit={(e) => e.preventDefault()}>
                        <label>Contact Us</label>
                        <input placeholder="Name"/>
                        <input placeholder="Email"/>
                        <input placeholder="Subject"/>
                        <input placeholder="Message"/>
                        <button className="btn">Send message</button>
                </form>
            </div>
        </div>
    )
}
