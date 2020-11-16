import React from 'react';
import { ScrollView, TextInput, StyleSheet, Button, View, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';

export default class LoginPage extends React.Component{

    constructor(props){
        super(props);
    
        this.state = {
          email: "",
          password: "",
          isLoading: false,
          message: ""
        }
      }

    componentDidMount(){
        AsyncStorage.getItem('NT::UserData').then((user_data_json) => {
            let user_data = JSON.parse(user_data_json)
            if(user_data != null){
                this.access(user_data)
            }
        });

        var firebaseConfig = {
            apiKey: "AIzaSyBYxDLhsX7UZojRJuSdYGwV679xOxrBlX8",
            authDomain: "lightsonbluetooth.firebaseapp.com",
            databaseURL: "https://lightsonbluetooth.firebaseio.com",
            projectId: "lightsonbluetooth",
            storageBucket: "lightsonbluetooth.appspot.com",
            messagingSenderId: "479982237335",
            appId: "1:479982237335:web:288ce8aea9998e02a01bd2"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    onChangeHandler(field, value){
        this.setState({[field]: value})
    }

    getMsgByErrorCode(errorCode){
        switch(errorCode){
            case "auth/wrong-password":
                return "Senha incorreta!";
            case "auth/invalid-email":
                return "E-mail inválido!";
            case "auth/user-not-found":
                return "Usuário não encontrado!";
            case "auth/user-disabled":
                return "Usuário desativado!";
            case "auth/email-already-in-use":
                return "Usuário já está em uso!";
            case "auth/operation-not-allowed":
                return "Operação não permitida";
            case "auth/weak-password":
                return "Senha muito fraca!"; 
            default:
                return "Erro desconhecido!"
        }

    }

    access(userData){
        this.setState({ isLoading: false});
        AsyncStorage.setItem('NT::UserData', JSON.stringify(userData));
        this.props.navigation.replace('Main');
        console.log("Login Done!")
    }

    login(){
        this.setState({isLoading: true, message: ''});
        const { email, password } = this.state;

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                this.access(user)
            })
            .catch(error => {
                this.setState({
                    message: this.getMsgByErrorCode(error.code),
                    isLoading: false
                })
            })
    }

    getRegister(){
        const { email, password } = this.state;
        if (!email || !password) {
            Alert.alert(
                "Cadastro!",
                "Para se cadastrar informe e-mail e senha"
            );
            return null;
        }
        Alert.alert(
            "Cadastro!",
            "Deseja cadastrar seu usuário com os dados informados?",
            [{ 
                text: "Cancelar",
                style: "cancel" //iOS
        },{
            text: "Cadastrar",
            onPress: () => { this.register() }
            }],
        );
    }

    register(){
        const { email, password } = this.state;

        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                this.access(user);
            })
            .catch(error => {
                this.setState({
                    message: this.getMsgByErrorCode(error.code),
                    isLoading: false
                });
            })
    }

    render(){
        return(
            <KeyboardAvoidingView behavior={ Platform.OS =="ios"? "padding" : "height" } style={{flex:1}}>
                <ScrollView style={styles.container}>

                    <View style={styles.logoView}>
                        <Image
                            source={ require('../img/bulb.png')}
                            style={styles.logo}
                            />
                    </View>
                    <FormRow>
                        <TextInput 
                        style={styles.input}
                        placeholderTextColor="#FFF"
                        placeholder="user@email.com"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={ value => this.onChangeHandler("email", value)}
                    />
                    </FormRow>
                    <FormRow>
                        <TextInput 
                        style={styles.input}
                        placeholderTextColor="#FFF"
                        placeholder="**********"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={ value => this.onChangeHandler("password", value)}
                    />
                    </FormRow>

                    { this.renderButton() }
                    { this.renderMessage() }

                    
                </ScrollView>
            </KeyboardAvoidingView>
        )    
    }

    renderMessage(){
        const { message } = this.state;
        if (!message)
            return null;

        Alert.alert(
            "Erro!",
            message.toString(),
            [{
                text: 'OK',
                onPress: () => {this.setState( { message: '' });}
            }]
        );
    }

    renderButton(){
        if(this.state.isLoading)
            return <ActivityIndicator size="large" style= {styles.loading} />

        return(
            <View>
                <View style={styles.btn}>
                        <Button
                            title="ENTRAR"
                            color="#EE7674"
                            onPress={() => this.login()}
                        />
                </View>
                
                <View style={styles.btn}>
                        <Button
                            title="CADASTRE-SE"
                            color="#F9B5AC"
                            onPress={() => this.getRegister()}
                        />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: "black"
    },
    input:{
        paddingRight: 5,
        paddingLeft: 5,
    },
    btn: {
        paddingTop: 20,
        fontSize: 11
    },
    logo:{
        aspectRatio: 1,
        resizeMode: 'center',
        width: 400,
        height: 400
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading:{
        padding: 20
    }
});