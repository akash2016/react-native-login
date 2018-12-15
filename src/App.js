import React, {Component} from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, Spinner } from './common';
import LoginForm from './LoginForm';


class App extends Component{
    state={loggedIn: null}
    componentWillMount(){
        firebase.initializeApp(
            {
                apiKey: "AIzaSyDed6DQApqONExezlVFQib83-0E4JYct0M",
                authDomain: "authentication-350ce.firebaseapp.com",
                databaseURL: "https://authentication-350ce.firebaseio.com",
                projectId: "authentication-350ce",
                storageBucket: "authentication-350ce.appspot.com",
                messagingSenderId: "433905564036"
              }
        );
        firebase.auth().onAuthStateChanged((user)=>{
          if(user){
              this.setState({loggedIn: true});
          }
          else{
            this.setState({loggedIn: false});
          }
        })
    }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
            return(
            <Button onPress={(() => firebase.auth().signOut())}>
            Log Out
            </Button>
            );
            case false:
            return (<LoginForm />);
            default: 
            return (<Spinner />);
        }
    }

    render(){
        return(
            <View style={{minHeight:150}}>
            <Header headerText={'Authentication'} /> 
             {this.renderContent()}
            </View>
        );
    }
}

export default App;