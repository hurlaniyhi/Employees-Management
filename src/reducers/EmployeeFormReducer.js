const INITIAL_STATE = {name: "", phone: "", shift: ""}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "update_employee":
            return {...state, [action.payload.prop]: action.payload.value}
        case "after_creating_employee":
            return INITIAL_STATE

        case "employee_updated":
            return INITIAL_STATE
        default:
            return state
    }
}