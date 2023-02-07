import React from 'react'
import {FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import './footer.scss'

export default function Footer() {
    return (
        <div className="Footer">
                <div className="container">
                    <div className="row-row">
                        <div className="footer-col">
                            <h4>Shop</h4>
                            <ul>
                                <li><a href="/">About us</a></li>
                                <li><a href="/">Our services</a></li>
                                <li><a href="/">Privacy policy</a></li>
                                <li><a href="/">Affiliate program</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Get help</h4>
                            <ul>
                                <li><a href="/">FAQ</a></li>
                                <li><a href="/">Shipping</a></li>
                                <li><a href="/">Returns</a></li>
                                <li><a href="/">Order status</a></li>
                                <li><a href="/">Payment options</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Sober shop</h4>
                            <ul>
                                <li><a href="/">Man</a></li>
                                <li><a href="/">Women</a></li>
                                <li><a href="/">Shoes</a></li>
                                <li><a href="/">Dress</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Follow us</h4>
                            <div className="social-links">
                                <a href="/"><i><FaFacebookF/></i></a>
                                <a href="/"><i><FaInstagram/></i></a>
                                <a href="/"><i><FaTwitter/></i></a>
                                <a href="/"><i><FaYoutube/></i></a>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
