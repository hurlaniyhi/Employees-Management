import React, {Component} from 'react'
import {View, Text, Picker, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {employeeUpdate} from '../actions/EmployeeActions'
import {CardSection, Input} from './reusable'

class EmployeeForm extends Component {
    render(){
        return(
            <View>
                <CardSection>
                    <Input 
                        label="Name"
                        placeholder="John Doe"
                        value={this.props.name}
                        onChangeText={text => this.props.employeeUpdate("name", text)}
                    />
                </CardSection>

                <CardSection>
                <Input 
                    label="Phone"
                    placeholder="555-555-555"
                    value={this.props.phone}
                    onChangeText={text => this.props.employeeUpdate("phone", text)}
                    />
                </CardSection>

                <CardSection style={{flexDirection: 'column', height: 120}}>
                    <Text style={styles.pickerText}>Select Shift</Text>
                    <Picker
                    style={{flex: 1, marginLeft: 50}}
                        selectedValue={this.props.shift}
                        onValueChange={day=>this.props.employeeUpdate("shift", day)}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                </CardSection>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerText: {
        fontSize: 18,
        paddingLeft: 20,
        paddingVertical: 10
    }
})

const mapStateToProps = state => {
    const {name, phone, shift} = state.employeeForm

    return {name, phone, shift}
}

export default connect(mapStateToProps, {employeeUpdate})(EmployeeForm)