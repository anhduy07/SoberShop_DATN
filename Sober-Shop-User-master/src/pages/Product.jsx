import productApi from 'api/productApi'
import Header from 'components/Header/Header'
import Loading from 'components/Loading/Loading'
import NotFound from 'components/NotFound'
import ProductDetail from 'features/Product/components/ProductDetail/ProductDetail'
import ProductReview from 'features/Product/components/ProductReview/ProductReview'
import Footer from 'layout/Footer/Footer'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Product(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setIsLoading(true);

                const productData = await productApi.show(id);

                if (productData.success)
                    setProduct(productData.data);
                else
                    console.log(productData.message);
                
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        }

        loadProduct();
    }, [id]);

    const body = isLoading ? (<div className="page-loading"><Loading backgroundColor="black" /></div>) :
        !product ? (
            <div className="Product">
                <NotFound />
            </div>
        ) : (
            <div className="Product">
                <Header />
                <ProductDetail product={product} />
                <ProductReview />
                <Footer />
            </div>
        );
    
    return body;
}
