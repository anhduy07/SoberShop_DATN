import React from 'react'
import './collectionItem.scss'

export default function CollectionItem({collection}) {
    return (
        <div className="CollectionItem">
            <img src={collection.img} alt="" />
            <div className="collection-container">
                    <div className="collection-title">
                        {collection.name}
                    </div>
                    <div className="collection-des">{collection.des}</div>
                    <div className="collection-price">
                       <div className="collection-price-main">
                            <p
                                className={`collection-price-text `}
                            >
                                {collection.price}
                            </p>
                            <div className={`add-to-cart`}>
                                ADD TO CARD
                            </div>
                       </div>
                    </div>
            </div>
        </div>
    )
}
