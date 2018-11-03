//a separate function that inserts the token into the authorization
import axios from 'axios';

const setAuthToken = token => {
	if (token) {
		//apply to every request that we make
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		//Delete the auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
