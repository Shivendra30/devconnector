import { GET_ERRORS, SET_CURRENT_USER } from './types';

import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//register user
export const registerUser = (userData, history) => dispatch => {
	//dispatch action

	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			//calling the dispatch function (an action) as we have a different reducer for errors
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//Login User - Get User token
export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			//save the token to local storage
			const { token } = res.data; //check the server file - we are returning the token from api/users/login
			localStorage.setItem('jwtToken', token);
			console.log('TOKEN', token);
			//set token to auth header
			setAuthToken(token); //a separate function that inserts the token into the authorization

			//Fill the header with user information (contained in the token).
			//We need to use jwt-decode to extract the info
			const decoded = jwt_decode(token);
			console.log('DECODED', decoded);

			//set current user (a separate function for this) and dispatch it
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			console.log(err);
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const setCurrentUser = user => {
	return {
		type: SET_CURRENT_USER,
		payload: user
	};
};

//Log User Out
export const logoutUser = () => dispatch => {
	//Remove the token from the localStorage
	localStorage.removeItem('jwtToken');
	//Remove the auth header from future reqeuests
	setAuthToken(false);
	//set the current user tp an empty object
	dispatch(setCurrentUser({}));
};
