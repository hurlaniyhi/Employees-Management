import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {connect} from 'react-redux'
import {emailChanged, passwordChanged, loginUser} from '../actions/AuthActions'
import { Card, CardSection, Input, Button, Spinner } from './reusable'


class LoginForm extends Component{

    onEmailChange(text){
        this.props.emailChanged(text)
    }

    onPasswordChange(text){ // we use bind(this) when calling this function because we will make use of "this" in the function
        this.props.passwordChanged(text)
    }

    onButtonPress() {
        const {email, password} = this.props

        this.props.loginUser(email, password)
    }

    renderError() {
        if (this.props.error){
            return(
                <View>
                    <Text style={styles.errorText}>{this.props.error}</Text>
                </View>
            )
        }
    }

    render(){
        return(
            
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    {this.props.loading ? <Spinner size="large" /> :
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>}
                </CardSection>
                
            </Card>
           

        )
    }
}


const styles = StyleSheet.create({
    errorText: {
        fontSize: 20,
        color: "red",
        textAlign: "center",
        paddingVertical: 10
    }
})

const mapStateToProps = state =>{
    const {email, password, error, loading} = state.auth

    return {
        email, password, error, loading 
    }
}

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm)