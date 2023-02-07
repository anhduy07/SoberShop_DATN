import { LOCAL_STORAGE } from 'constants/gloabalUrl';
import React from 'react'
import { Redirect } from 'react-router-dom';

function ProtectedRoute(Component) {
	function HOC(props) {
		const auth = window.localStorage.getItem(LOCAL_STORAGE.accessToken);

		if(!auth) {
			return <Redirect to='/login' />
		} else {
			return <Component { ...props } />
		}
	}
	return HOC;
}

export default ProtectedRoute;