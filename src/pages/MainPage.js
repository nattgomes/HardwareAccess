import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  StatusBar,
} from 'react-native';




export default class MainPage extends React.Component{
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