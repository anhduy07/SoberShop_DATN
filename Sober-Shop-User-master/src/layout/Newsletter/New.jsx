import React, { useState } from 'react'
import './new.scss'

export default function New() {

    const [emailInput, setEmailInput] = useState("")

    const handleChange = (e) => {
        setEmailInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailInput("");

    }

    return (
        <div className="Newsletter">
            <div className="newsletter-container">
                <div className="newsletter-title">Newsletter</div>
                <div className="newsletter-small">Get timely updates from your favorite products</div>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <input 
                        className="newsletter-input" 
                        placeholder="Enter your email address" 
                        type="email"
                        value={emailInput}
                        onChange={handleChange}
                    />
                    <button className="newsletter-btn">Subcribe</button>
                </form>
            </div>
        </div>
    )
}
