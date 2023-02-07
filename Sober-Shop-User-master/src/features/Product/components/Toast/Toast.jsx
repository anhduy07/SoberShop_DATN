import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import './toast.scss'

export default function Toast() {

    return (
        <div className="Toast">
            <FaCheckCircle className="icon-toast" />
            <span>Product is added to cart successfully</span>
        </div>
    )
}
