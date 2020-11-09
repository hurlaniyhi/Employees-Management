import _ from 'lodash'
import React, {Component} from 'react'
import {View, Text, FlatList, TouchableWithoutFeedback} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {connect} from 'react-redux'
import {employeesFetch} from '../actions'
import { CardSection, Spinner } from './reusable'


class EmployeeList extends Component {
    componentWillMount(){
        this.props.employeesFetch()
       
    }

    // handlePress(){
    //     console.log("great")
    //     Actions.employeeCreate()
    // }

    renderItem({item}){
        return (
            <TouchableWithoutFeedback onPress={() => {
              
                Actions.employeeEdit({employee: item}) 
                // we can carry a particular information to the page we are navigating to just by passing that 
                // information. in this case i want to pass one particular employee detail to the next page.
                // item hold detail of the employee, meaning i will be passing/carrying item to the next page
                // i make item a value to employee key so that i can now access the item in the nextpage by using the
                // employee key. so to make use of the item(info) in the next page, i will use this.props.employee
                // in the next page.
                
            }}>
                <View>
                    <CardSection>
                        <Text style={{fontSize: 18, paddingLeft: 20}}>{item.name}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    render(){
        return(
            <View>

                {this.props.employees.length >= 1 ? <FlatList 
                    data={this.props.employees}
                    keyExtractor={(item) => item.uid}
                    renderItem={this.renderItem}      
                />: 
                <View style={{marginTop: 50}}><Spinner size="large"/></View>}
            </View>
        )
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return {...val, uid}
    })

    // it converts the object to array using lodash. uid denote the keys of the object while val denote value of the keys
    // so lodash convert a particular key and value(which is also an object) to a single object which will be an element
    // of the array. each object of the array will look like {name: john, phone: 090, shift: monday, uid: uid}

    return {employees}
}

export default connect(mapStateToProps, {employeesFetch})(EmployeeList)