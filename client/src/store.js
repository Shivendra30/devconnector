import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';
//thunk helps us use dispatch in actions

const initialState = {};
const middleware = [thunk]; //we can now add any middleware that we want to this array
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

//We only bought compose to call both the applyMiddleware and the redux extension

export default store;
