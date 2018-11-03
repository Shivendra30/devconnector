//Root Reducer - bring all reducers here

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
const rootReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer
});

export default rootReducer;
//For exmaple to refer to the auth reducer inside any component we will say this.props.auth
