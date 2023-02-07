import React from 'react'
import { Link } from 'react-router-dom'
import rb1 from '../../../assets/images/rb1.jpg'
import rb2 from '../../../assets/images/rb2.jpg'
import rb3 from '../../../assets/images/rb3.jpg'
import rb4 from '../../../assets/images/rb4.jpg'
import './recommendbanner.scss'

export default function RecommendBanner() {

    const handleClick = () => {
        window.scroll(0,0)
    }

    return (
        <div className="recommend-banner">
            <div className="recommend-banner-container flex-center">
                <div className="banner-box img-hover">
                    <img src={rb1} alt="" />
                    <div className="blackbox-container">
                        <div className="blackbox-container-title"> New Arrilvals</div>
                        <div className="blackbox-container-center">
                            <Link
                                className="blackbox-link"
                                to="/shop"
                                onClick={handleClick}
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="banner-box ">
                    <div className="banner-top flex-center">
                        <div className="banner-top-item img-hover">
                            <img src={rb2} alt="" />
                            <div className="blackbox-container">
                                <div className="blackbox-container-title small">Women</div>
                                <div className="blackbox-container-center">
                                <Link
                                    className="blackbox-link"
                                    to="/shop"
                                >
                                    Shop Now
                                </Link>
                                </div>
                            </div>
                            
                        </div>
                        <div className="banner-top-item img-hover">
                            <img src={rb3} alt="" />
                            <div className="blackbox-container">
                                <div className="blackbox-container-title small">Men </div>
                                <div className="blackbox-container-center">
                                <Link
                                    className="blackbox-link"
                                    to="/shop"
                                >
                                    Shop Now
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner-bottom img-hover">
                        <img src={rb4} alt="" />
                        <div className="blackbox-container">
                            <div className="blackbox-container-title small">Free Shipping On All Orders </div>
                            <div className="blackbox-container-center">
                            <Link
                                className="blackbox-link"
                                to="/shop"
                            >
                                Shop Now
                            </Link> 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
