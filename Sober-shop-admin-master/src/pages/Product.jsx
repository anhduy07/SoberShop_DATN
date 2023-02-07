import React from 'react'
import AddProduct from 'features/Product/AddProduct/AddProduct'
import ProductCategory from 'features/Product/ProductCategory'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import EditProduct from 'features/Product/AddProduct/EditProduct';

export default function Product() {
    const match = useRouteMatch();

    return (
        <div className="product">
            <Switch>
                <Route path={`${match.url}/list-product`} component={ProductCategory}/>
                <Route path={`${match.url}/add-product`} component={AddProduct}/>
                <Route path={`${match.url}/edit-product`} component={EditProduct}/>
            </Switch>
        </div>
    )
}
