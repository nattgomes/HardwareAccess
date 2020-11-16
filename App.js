/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MainPage from './src/pages/MainPage'
import LoginPage from './src/pages/LoginPage'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending...']);



const AppNavigator = createStackNavigator({

  'Login':{
    screen: LoginPage,
    navigationOptions: {
        headerShown: false,
    }
  },
  'Main':{
    screen: MainPage,
    navigationOptions: {
        title: 'Lights On',
        headerTitleStyle: {
            textAlign: 'left',
            fontSize: 20,
            color: 'white',
        },
    }
},
},
{
defaultNavigationOptions: {
    title: 'Lights On',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#000',
        borderBottomColor: '#f4f2ff'
    },
    headerTitleStyle:{
        color: 'black',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center',
    }
}
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;






// const MyStatusBar = ({backgroundColor, ...props}) => (
//   <View style={[styles.statusBar, { backgroundColor }]}>
//     <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//   </View>
// );

// export default class App extends React.Component{
//   render() {
//     return(

//       <View style={ styles.container }>
//         <MyStatusBar backgroundColor="#000000" barStyle="light-content" />

//         {/* <Header
//           leftComponent={{ icon: 'menu', color: '#fff' }}
//           centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
//           rightComponent={{ icon: 'home', color: '#fff' }}
//         /> */}




//         <Text style={ styles.titleHeader }>Bla</Text>
//       </View>
//     );
//   }
// }

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   statusBar: {
//     height: STATUSBAR_HEIGHT,
//   },
//   appBar: {
//     backgroundColor:'#79B45D',
//     height: APPBAR_HEIGHT,
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#33373B',
//   },
// });







/* 

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>oi</Text>
            </View>
           
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.black,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  
  highlight: {
    fontWeight: '700',
  },

});

export default App; */
