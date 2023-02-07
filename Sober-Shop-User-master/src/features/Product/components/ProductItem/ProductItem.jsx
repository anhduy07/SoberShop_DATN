import React from 'react'
import ProductOverlay from '../ProductOverlay/ProductOverlay'
import './productItem.scss';
import {numberFormat} from "utils/common";

export default function ProductItem({ product }) {
    
    const productDate = Date.parse(product.createdAt);
    const today = new Date();

    return (
        <div className="ProductItem">
            <div className="product">
                <div className="product-img">
                    <div className="product-tag">
                    {
                        product.discount > 0 && <div className="product-tag sale">
                            {product.discount}%
                        </div>
                    }
                    {
                        product.sold >= 40 && <div className="product-tag hot">
                            HOT
                        </div>
                    }
                    {
                        (today - productDate) / (1000 * 3600 * 24) < 10 && <div className="product-tag new">
                            NEW
                        </div>
                    }
                    </div>
                    <div className="product-img-bg">
                            <img src={product.thumb[0]} alt="" />
                        <img 
                            className="img-default hide"
                            src={product.thumb[1]}
                            alt="" 
                        />
                    </div>
                        <ProductOverlay
                            product={product}
                        />
                </div>
                <div className="product-title">
                    {product.name}
                </div>
                <div className="product-price">
                    ${numberFormat(product.price)}
                </div>
            </div>            
        </div>
    )
}
