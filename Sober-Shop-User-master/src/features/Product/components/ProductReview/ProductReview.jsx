import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import {PRODUCT_CATEGORY as products} from '../../../../constants/global'
import './productReview.scss'

const productRev = [
    {
        ratingName: "John Smith",
        ratingText: "A dress is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice It consists of a top piece that covers the torso and hangs",
        ratingStar: 2,
        ratingAvt: "https://bloganchoi.com/wp-content/uploads/2020/10/tieu-chien-5.jpg",
        ratingEmail: "khongten@gmail.com",
    },
    {
        ratingName: "John Smith",
        ratingText: "A dress is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice It consists of a top piece that covers the torso and hangs",
        ratingStar: 3.5,
        ratingAvt: "https://bloganchoi.com/wp-content/uploads/2020/10/tieu-chien-5.jpg",
        ratingEmail: "khongten@gmail.com",
    },
    {
        ratingName: "John Smith",
        ratingText: "A dress is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice It consists of a top piece that covers the torso and hangs",
        ratingStar: 5,
        ratingAvt: "https://bloganchoi.com/wp-content/uploads/2020/10/tieu-chien-5.jpg",
        ratingEmail: "khongten@gmail.com",
    }
];

export default function ProductReview() {

    const [tab, setTab] = useState(false);
    const [nameInput, setNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [reviewInput, setReviewInput] = useState("")
    const [ratingValue, setRatingValue] = useState(0)
    const [productVote, setProductVote] = useState([...productRev])

    const defaultStar = {
        size: 24,
        value: 0,
        activeColor: "#fda32a",
        color: "#ddd",
        isHalf: true,
        edit: true,
        onChange: (newValue) => {
            setRatingValue(newValue);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ratingName: nameInput,
            ratingText: reviewInput,
            ratingEmail: emailInput,
            ratingStar: ratingValue,
            ratingAvt: productVote[0].ratingAvt
        }
        const newProductRev = [...productVote, data];
        setProductVote(newProductRev)
        setReviewInput("")
    }

    useEffect(() => {
        setNameInput("")
        setEmailInput("")
    }, [productVote])

    return (
        <div className="ProductReview">
            <div className="product-rev-container">
                <div className="product-rev-tab">
                    <div 
                        className={tab ? "product-rev-title active" : "product-rev-title"}
                        onClick={() => setTab(true)}
                    >
                        Description
                    </div>
                    <div
                        className={!tab ? "product-rev-title active" : "product-rev-title"}
                        onClick={() => setTab(false)}
                    >
                        Reviews
                        <span className={!tab ? "span-active" : " "}>{productVote.length}</span>
                    </div>
                </div>
                
                <div className="product-rev-content">
                    {tab && 
                        <div className="product-rev-des">
                            {products[0].des}
                        </div>
                    }
                    {!tab && 
                        <div className="product-rev-list">
                            {productVote.map((item,index) => {
                                const ratingStar = {
                                    size: 14,
                                    value: item.ratingStar,
                                    edit: false,
                                    activeColor: "#fda32a",
                                    color: "#ddd",
                                    isHalf: true
                                }
                                const date = new Date()
                                const day = date.getDate();
                                const month = date.getMonth() + 1;
                                const year = date.getFullYear();
                                return (
                                    <div className="product-rev-item" key={index}>
                                        <div className="user-avt">
                                                <img src={item.ratingAvt} alt="" />
                                        </div>
                                        <div className="user-info">
                                            <div className="user-name">{item.ratingName}</div>
                                            <div className="user-ratingStar">
                                                <ReactStars {...ratingStar}/>
                                            </div>
                                            <div className="user-cmt">{item.ratingText}</div>
                                            <div className="date">
                                                {`${month}-${day}-${year}`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="product-rev-cmt">
                                <p>Add a review</p>
                                <p style={{textAlign: "center", color: "#777", fontSize: "12px"}}>Your email address will not be published. Required fields are marked *</p>
                                <p style={{color: "#777", marginBottom: "5px"}}>Your rating *</p>
                                <ReactStars {...defaultStar}/>
                                <form className="rev-form" onSubmit={handleSubmit}>
                                    <p className="form-title">Your review *</p>
                                    <input 
                                        type="text" 
                                        className="no-outline"
                                        value={reviewInput}
                                        onChange={(e) => setReviewInput(e.target.value)}
                                    />

                                    <div className="flex">
                                        <div>
                                            <p className="form-title">Name *</p>
                                            <input 
                                                type="text" 
                                                className="no-outline"
                                                value={nameInput}
                                                onChange={(e) => setNameInput(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <p className="form-title">Email *</p>
                                            <input 
                                                type="email" 
                                                className="no-outline"
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <button className="submit-btn">Submit</button>
                                </form>

                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}
