import React from 'react';
import { BleManager, Device } from "react-native-ble-plx"
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import base64 from 'react-native-base64';




export default class MainPage extends React.Component{
    constructor(){
        super()
        this.manager = new BleManager()
        this.device = new Device()
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
                        // await device.discoverAllServicesAndCharacteristics();
                        // const services = await device.services();
                        // services.forEach(async service => {
                        // const characteristics = await device.characteristicsForService(service.uuid);
                        // characteristics.forEach(console.log);
                        // });
                    })
                    .then((device) => {
                        console.log("Setting notifications")
                    })
                    .then(() => {
                        console.log("Listening...")
                        this.send(device)
                    }, (error) => {
                        console.log(error.message)
                    })
                this.device = device
                }
                //
            });
    }

    send(){
        console.log(this.manager.monitorCharacteristicForDevice())
        this.manager.writeCharacteristicWithResponseForDevice("CF0E6809-8B8E-DD95-4CF6-3CE7B4BBD16A",
            "0000ffe0-0000-1000-8000-00805f9b34fb", "FFE1", base64.encode("H"))
            .catch((error) => {
                console.log('error in writing data');
                console.log(error);
            })
    }


    componentDidMount(){
        if (Platform.OS === 'ios'){
            this.manager.onStateChange((state) => {
                if (state === 'PoweredOn') this.scanAndConnect()
            })
        } else {
            this.scanAndConnect()
        }
        this.send()
    }


    render() {
        return(
          <View style={ styles.container }>
              <ImageBackground
                source={require('../img/background.png')}
                style={styles.bgImage}
                resizeMode = 'cover'>

                <View style={[styles.section, styles.sectionLarge]}>
                    <Text>Bla</Text>
                </View>
            </ImageBackground>

            </View>


        );
      }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight:10,
     },
     bgImage:{
         flex: 1,
         marginHorizontal: -20,
     },
     txtPoint:{
         color: "white",
         fontSize: 80,
     },
     section:{
         flex: 1,
         paddingHorizontal:20,
         justifyContent: "center",
         alignItems: "center"
        },
    sectionLarge:{
        flex: 4,
        justifyContent: "space-around",
    },

  });