const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "employees_success":
            return action.payload
            
        default:
            return state
    }
}