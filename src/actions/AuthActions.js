import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'

export const emailChanged = (text) => {
    return {
        type: "email_changed",
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: "password_changed",
        payload: text
    }
}

// redux-thunk allows us to make an http request inside an action creator function which we will then dispatch an
// action base on the response of the request. i.e it allows us to make asynchronous request inside action creator
// which allows the request to be completed before dispatching an action.
// npm install --save redux-thunk.
// after install, tell redux to make use of redux-thunk by wiring it up i.e import Redux-Thunk from 'redux-thunk'
// also import {applyMiddleware} from 'redux'.
// add empty object as the second argument to creatorStore function inside the provider element,
// add applyMiddleware(ReduxThunk) as the third argument. 
// i.e <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
// the second argument is for any initial state we may want to pass to our redux application
// so after setting up redux thunk, we can now return a function inside our action creator. the function will have 
// a parameter called dispatch and our asynchronous request can then be inside that function we returned.
// when the request is completed, we can then dispatch an action to the reducer

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({type: "start_login"})
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({ type:"login_success", payload: user})
                Actions.main()
                
            })
            .catch(()=>{
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user)) 
                    // instead of using dispatch directly like the above, we decided to turn the .then callback to a function
                    // which we now called.
                    .catch(()=> loginUserFail(dispatch))
            })
    }
}



const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: "login_success",
        payload: user
    })

    Actions.main()
}

const loginUserFail = (dispatch) => {
    dispatch({
        type: "login_fail",
        payload: "Authentication Failed"
    })
}


