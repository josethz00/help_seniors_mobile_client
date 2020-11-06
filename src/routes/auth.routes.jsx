import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AddressForm from '../screens/AddressForm';


const Stack = createStackNavigator();

const AuthRoutes = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='AddressForm' component={AddressForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default AuthRoutes;