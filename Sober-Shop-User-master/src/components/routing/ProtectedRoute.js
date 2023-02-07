
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';

function ProtectedRoute(WrappedComponent) {
    function HOC(props) {
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
        const isAuthLoading = useSelector(state => state.auth.isAuthLoading);

        if(isAuthLoading) {
            return (
                <div className="page-loading">
                    <Loading backgroundColor="black" />
                </div>
            )
        }
        
        if(isAuthenticated) {
            return <WrappedComponent { ...props } />
        } else {
            return <Redirect to='/user' />
        }
    };

    return HOC;
}

export default ProtectedRoute;