import React from 'react';
import { BleManager, Device } from "react-native-ble-plx"
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';


export default class MainPage extends React.Component{
    constructor(){
        let cha;
        super()
        this.manager = new BleManager()
        // this.device = new Device()
        this.state={
            device: null,
            buttonClicked: false,
            messages: [],
        };
      }

    componentDidMount(){
        const subscription = this.manager.onStateChange(state => {
            if (state === "PoweredOn") {
              this.scanAndConnect();
              console.log("Bluetooth: ON");
            } else {
              console.log("Bluetooth: OFF");
            }
          }, true);
    }

    scanAndConnect(){
        const BLE_DEVICE_NAME = 'BT05'

        this.manager.startDeviceScan(null, null, (error, device) => {
            console.log("Scanning...")
            //console.log(device)

            if (error) {
                this.error(error.message)
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
                    // .then((device) => {
                    //     console.log("Setting notifications")
                    // })
                    .then((device) => {
                        this.findServicesAndCharacteristics(device);
                    })
                    .catch(error => {
                        console.log(error.message)
                      });
                    // .then(() => {
                    //     console.log("Listening...")
                    //     // this.send(device)
                    // }, (error) => {
                    //     console.log(error.message)
                    // })
                // this.device = device
                }
                //
            });
    }

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

    // send(){
    //     this.manager.writeCharacteristicWithResponseForDevice("CF0E6809-8B8E-DD95-4CF6-3CE7B4BBD16A",
    //         "0000ffe0-0000-1000-8000-00805f9b34fb", "FFE1", "TAo=")
    //         .catch((error) => {
    //             console.log('error in writing data');
    //             console.log(error);
    //         })
    // }

    turnOn(val){
        this.cha.writeWithoutResponse(val).catch(err => {
            console.log("Could not write value to Arduino");
        });
        let message = "LED's turned on"
        this.setState({messages: message, buttonClicked: true})
       }

    turnOff(val) {
        this.cha.writeWithoutResponse(val).catch(err => {
          console.log("Could not turn off leds")
          });
        let message = "LED's turned off"
        this.setState({messages: message})
      }

    render() {
        return(
          <View style={ styles.container }>
              
              <ImageBackground
                source={require('../img/background.png')}
                style={styles.bgImage}
                resizeMode = 'cover'>

                <View style={[styles.default, styles.line]}>
                <Image style={[styles.default, styles.icon]} 
                    source={require('../img/escritorio.png')} />
                <Text style={ [styles.default, styles.name_light] }> Escritório</Text>
                <TouchableOpacity style={styles.touchable} onPress={() => this.turnOn("SAo=")}>
                <Image style={styles.icon2} resizeMode="center"
                    source={require('../img/turn_on.png')} />
                     </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={() => this.turnOn("TAo=")}>          
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "row",
     },
     line:{
        flexDirection: "row"
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
         borderWidth: 0.5,
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

  });