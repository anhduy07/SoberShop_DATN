import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './newbanner.scss'

export default function NewBanner({backgroundImg, title}) {
    return (
        <div className="NewBanner">
            <div 
                className="newbanner-container"
                style={{backgroundImage: `url(${backgroundImg})`}}
            >
                <div className="newbanner-container-overlay">
                    <div className="newbanner-title">
                        {title}
                    </div>
                    <div className="newbanner-back">
                        <Link to="/" className="link">Home</Link>
                        <FaAngleRight className="icon"/>
                        <div>{title}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
