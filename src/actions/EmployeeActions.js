import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'

export const employeeUpdate = (prop, value) => {
    return {
        type: "update_employee",
        payload: {prop, value}
    }
}

export const employeeCreate = ({name, phone, shift}) => {
    const {currentUser} = firebase.auth() // to get current authenticated userId

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`) 
            .push({name, phone, shift})
            .then(()=> {
                dispatch({type: "after_creating_employee"})
                Actions.employeeList({type: 'reset'})
            }) // type: reset ensure that we the page dont have backbutton
    
    }

    // /users/${currentUser.uid}/employees means access our database, find a key users, inside it find a key userId(userId of the currently authenticated user), inside it find a key employees
    // we then use .push({info}) to add the new info to that as a value to that employees key.

    // note that the users is a property of an object in our database with a value equal to another object with another
    // property with key ${userId}. the userId also has a value equals to an object with a property with key of employees
    // the employees key takes an object as a value. that object value of the employees key is the one we are pushing.

}


export const employeesFetch = () => {
    const {currentUser} = firebase.auth()
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({type: "employees_success", payload: snapshot.val()})
            })
            // snapshot.val() provide all information(value which is an object with properties) inside that employees key
    }
}


export const employeeEdit = ({name, phone, shift, uid}) => { // uid is the id of the employee we want to edit
    const {currentUser} =firebase.auth()
   
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`) 
            .set({name, phone, shift})
            .then(()=> {
                 dispatch({type: "employee_updated"})  
                Actions.employeeList({type: 'reset'})

                // the reason why we dont have to update the reduce to get the updated list of employees info is that
                // any changes we make, the event listener we used (.on(value, snapshot...)) at the point of fetching 
                // the list of employee will automatically receive the update and update the reducer
            }) 
    
    }
}

export const employeeDelete = ({uid}) => {
    const {currentUser} =firebase.auth()

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`) 
            .remove()
            .then(()=> {
                Actions.employeeList({type: 'reset'})
            }) 
    
    }
}