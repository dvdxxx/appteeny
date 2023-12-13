import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import CapScreen from './src/screens/caps';
import TopNavigation from './src/components/TopNavigation';
import NavigationLogic from './src/components/Navigation';
import CapHeader from './src/components/CapHeader';
import RegisterScreen from './src/screens/register';
import SignIn from './src/screens/signin';
import SignUp from './src/screens/signup';
import Forgot from './src/screens/forgot';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <TopNavigation />,
        }}
      >
        <Stack.Screen name="Root" component={NavigationLogic} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign-in" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Sign-up" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
        <Stack.Screen
          name="Cap"
          component={CapScreen}
          options={({ route }) => ({
            header: () => <CapHeader d={route.params?.queryParams?.d} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
