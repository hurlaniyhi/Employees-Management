const INITIAL_STATE = { email: "", password: "", loading: false, error: "", user: null }

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        default:
            return state
        case "email_changed":
            return {...state, email: action.payload}
        
        case "password_changed":
            return {...state, password: action.payload} 

        case 'login_success':
            return {...state, ...INITIAL_STATE, user: action.payload}

        case 'login_fail':
            return {...state, error: action.payload, password: "", loading: false}

        case "start_login":
            return {...state, loading: true, error: ""}
         
    }
}