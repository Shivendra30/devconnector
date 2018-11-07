//Root Reducer - bring all reducers here

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer
});

export default rootReducer;
//For exmaple to refer to the auth reducer inside any component we will say this.props.auth
