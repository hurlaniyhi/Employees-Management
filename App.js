import React from 'react'
import { registerRootComponent } from 'expo';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./src/screens/Home";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// const navigator = createStackNavigator(
//   {
//     Home: Home
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       title: "App",
//       headerShown: false
//     }
//   }
// );

// export default createAppContainer(navigator);

const App = () => {
  return (
    <SafeAreaProvider>
    <Home />
    </SafeAreaProvider>
  )
  
}
registerRootComponent(App)
