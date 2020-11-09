import _ from 'lodash'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Communications from 'react-native-communications'
import {employeeUpdate, employeeEdit, employeeDelete} from '../actions'
import {Card, CardSection, Button, Confirm} from './reusable'
import EmployeeForm from './EmployeeForm'


class EmployeeEdit extends Component {

    state = {showModal: false}

    componentWillMount(){
        // we want to pre-filled our reducer with the information of the current employee we choose to edit since
        // we already have the info(this.props.employee) of the selected employee which was passed at the point when
        // we want to navigate to this component
        // so we will loop through the object (this.props.employee) and we will update the reducer for each of the
        // key and value
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate(prop, value)
        })
    }

    onButtonPress(){
        const {name, phone, shift} = this.props

        this.props.employeeEdit({name, phone, shift, uid: this.props.employee.uid})
        
    }


    onTextPress(){
        const {name, phone, shift} = this.props
        Communications.text(phone, `Your upcoming shift is on ${shift}`)
    }

    onAccept(){
        this.props.employeeDelete({uid: this.props.employee.uid})
    }


    render(){
       
        return (
            <Card>
                <EmployeeForm {...this.props}/>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({showModal: !this.state.showModal})}>
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={()=> this.setState({showModal: false})}
                >
                    Are you sure you want to delete this ?
                </Confirm>
            </Card>
        )
    }
}


const mapStateToProps = state => {
    const {name, phone, shift} = state.employeeForm

    return {name, phone, shift}
}

export default connect(mapStateToProps, {employeeUpdate, employeeEdit, employeeDelete})(EmployeeEdit)