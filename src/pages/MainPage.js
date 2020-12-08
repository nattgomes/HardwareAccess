import React from 'react';
import { BleManager, Device } from "react-native-ble-plx"
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Button,
} from 'react-native';
import firebase from 'firebase';


import onImg from '../img/on_img.png';
import offImg from '../img/off_img.png';


export default class MainPage extends React.Component{
  

    // Define um construtor com estado isOn = false para inicializar imagem de botão desligado
    constructor(){
        let cha;
        super()
        this.manager = new BleManager()
        this.state={ isOn: false, isLoading: true };
      }

    // Caso o estado do dispositivo BLE esteja ativo, chama função para scan e conexão
    componentDidMount(){
        const subscription = this.manager.onStateChange(state => {
            if (state === "PoweredOn") {
              this.scanAndConnect();
              console.log("Bluetooth: ON");
            } else {
              console.log("Bluetooth: OFF");
              this.scanAndConnect();
            }
          }, true);
    }

    // realiza scan de dispositivo BLE pelo nome informado. Se encontra, para o scan e tenta conectar
    scanAndConnect(){
        const BLE_DEVICE_NAME = 'BT05'

        this.manager.startDeviceScan(null, null, (error, device) => {
            console.log("Scanning...")
            //console.log(device)

            if (error) {
                console.log(error)
                return
            }

            if (device.name == BLE_DEVICE_NAME){
                console.log("Connecting to device")
                this.manager.stopDeviceScan()
                device.connect()
                    .then((device) => {
                        console.log("Connected! Discovering services and characteristics")
                        return device.discoverAllServicesAndCharacteristics()
                    })
                    .then((device) => {
                        this.findServicesAndCharacteristics(device);
                    })
                    .catch(error => {
                        console.log(error.message)
                      });
                }
            });
    }

    // Descobre serviços e características e atribui a um objeto com o qual se comunicará com o BLE
    findServicesAndCharacteristics(device) {
        device.services().then(services => {
          services.forEach((service, i) => {
            console.log("Service UUID: " + service.uuid);
            service.characteristics().then(characteristics => {
              characteristics.forEach((c, i) => {
                if (c.isWritableWithoutResponse) {
                  this.cha = c;
                }
              });
            });
          });
        });
      }

    // Como a imagem é trocada de acordo com o status do LED (ligado ou não), renderiza a imagem em conformidade com este status. A luz sempre inicializa desligada.
    renderImage() {
      var imgSource = this.state.isOn? onImg : offImg;
      return (
        <Image
          style={ styles.icon2 } 
          resizeMode="center"
          source={ imgSource }
        />
      );
    }

    // Chamada responsável por verificar o status atual do LED e realizar ação de liga-lo caso desligado e vice-versa.
    turnOnOff(){ 
      this.state.isOn = !this.state.isOn;
      this.setState({isOn: this.state.isOn});
      if (this.state.isOn){
        this.sendMessage("SAo=")
        console.log("LED On !")
      }
      else{
        this.sendMessage("TAo=")
        console.log("LED Off !")
      }
    }

    // Função através da qual efetivamente é realizada a comunicação com o BLE. Recebe como parâmetro uma letra (H ou L) codificada em base64 que é necessária na chamada do método writeWithoutResponse(()
    sendMessage(val){
        this.cha.writeWithoutResponse(val).catch(err => {
            console.log("Could not write value to Arduino");
        });
       }

     
     signOut = async () => {
      try {
          await AsyncStorage.clear(); // to clear the token 
          this.setState({ isLoading: false});
      } catch (e) {
          console.log(e);
      }
  }



    // Responsável pela renderização da tela. Atribui imagem para background e outras imagens para botões. Apenas o botão de ligar/desligar possui função associada
    render() {

      //console.log(firebase.auth().currentUser)
      if (!this.state.isLoading) {
        this.props.navigation.replace('Login')};
      
      return(
        <View style={ styles.container }>
                
            <ImageBackground
              source={require('../img/background.png')}
              style={styles.bgImage}
              resizeMode = 'cover'>
  
              <View style={[styles.default, styles.line, styles.btn_logOff]}>
              <Button color="yellow"  title="Sair" onPress={() => this.signOut()} />
              </View>
              <View style={[styles.default, styles.line]}>
              <Image style={[styles.default, styles.icon]} 
                  source={require('../img/escritorio.png')} />
              <Text style={ [styles.default, styles.name_light] }> Escritório</Text>
              <TouchableOpacity style={styles.touchable} onPress={() => this.turnOnOff() }>
                {this.renderImage()}
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable}>          
              <Image style={styles.icon2}
                  source={require('../img/control.png')} resizeMode="center"/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable}> 
              <Image style={styles.icon2} 
                  source={require('../img/config.png')} resizeMode="center"/>
              </TouchableOpacity>
              
              </View>
          </ImageBackground>
  
          </View>
      );
  }
}

// Configuração de estilo para componentes da página
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "row",
     },
     line:{
        flexDirection: "row",
     },
     touchable:{
         flex: 0.25,
     },
     bgImage:{
         flex: 1,
         marginHorizontal: -20,
     },
     default:{
         padding:20,
         borderRadius:4,
         borderWidth: 0.1,
     },
     icon:{
         flex: 0.1, 
         width: 10,
        height: 10,
     },
     icon2:{
        flex: 1, 
        width: 50,
       height: 50,
      },
      name_light:{
        flex: 0.6,
        textAlign: "left",
        color: 'white',
        fontSize: 18,
        flexGrow: 1,
        padding:10,
      },
      btn_turn_on_off:{
        flex: 0.4,
        textAlign: "center"
      },
      btn_logOff:{
        justifyContent: 'flex-end',
        textAlign: 'right',
        marginBottom: -25,
        marginTop: -15,

      }
  });