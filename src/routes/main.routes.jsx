import React from 'react';
import { Image, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from 'expo-vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Modal from '../screens/Modal';
import CreateCases from '../screens/CreateCases';
import MyCases from '../screens/MyCases';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainRoutes = () => {
    

    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                gestureEnabled: true,
                headerTransparent: true,
                headerStyle: {
                    height: 78
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: false
                }}
                headerMode='float'>
                <Stack.Screen
                    name='Home'
                    options={({ route }) => ({
                        headerLeft:  null,
                        headerTitle: ()=>
                        <View style={{flex:1, alignItems: 'center', marginTop: 3}}>
                            <Image source={require('../assets/images/logo.png')} style={{width: 44, height: 44}}  />
                        </View>
                    })}
                >
                    {props=>
                        <Tabs   
                            backgroundColor='#fff'
                            activeTintColor='#5271ff'
                            inactiveTintColor='#ccc'
                            caseColor='#fafafa'
                        />
                    }
                </Stack.Screen>
                <Stack.Screen
                    name='Modal'
                    options={({ route }) => ({
                        headerShown: false
                    })}
                >
                    {props=>
                        <Modal />
                    }
                </Stack.Screen>
                <Stack.Screen
                    name='MapModal'
                    options={({ route }) => ({
                        headerLeft:  null,
                        headerShown: false,
                        headerTitle: ()=>
                        <View style={{flex:1, alignItems: 'center', marginTop: 3}}>
                            <Image source={require('../assets/images/logo.png')} style={{width: 44, height: 44}} />
                        </View>,
                    })}
                >
                    {props=>
                        <MapModal />
                    }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );

}



const Tabs = ({
    backgroundColor,
    activeTintColor,
    inactiveTintColor,
    caseColor
})=>{

    return(
            <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor,
                        inactiveTintColor,
                        labelStyle:{
                            fontSize: 12,
                            fontWeight: 'bold'
                        },
                        tabStyle:{
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        iconStyle: {
                            flex: 0,
                            top: 7
                        },
                        style: {
                            backgroundColor,
                            height: 60,
                            borderWidth: 0,  
                            elevation: 10,
                            shadowOpacity: 0,
                            borderRadius: 60,
                            marginBottom: 15,
                            marginHorizontal: 20,
                            marginTop: 25
                        }
                    }}
            >

                <Tab.Screen name='CreateCases' component={CreateCases} options={{ title: '', tabBarIcon:({color, size})=>
                            <Ionicons color={color} name="ios-add-circle" size={31}/>}}  
                />

                <Tab.Screen name='MyCases' component={MyCases} options={{ title: '', tabBarIcon:({color})=>
                            <LinearGradient 
                                start={{x: 1, y: 0}} end={{x: 0, y: 1}}
                                colors={['#1dd', '#5271ff', '#4a12aa']}
                                style={{
                                    flex: 1, 
                                    top: -50, 
                                    backgroundColor: caseColor, 
                                    borderWidth: 2, 
                                    position: 'absolute',
                                    borderColor: color,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 65,
                                    height: 65,
                                    borderRadius: 100, 
                                }}
                            >
                                <Ionicons color="#fff" name="ios-heart" size={31}/>
                            </LinearGradient>                         
                        }}  
                />

                <Tab.Screen name='Profile' component={Profile} options={{ title: '', tabBarIcon:({color, size})=>
                            <Ionicons color={color} name="md-person" size={31}/>                
                        }}  
                />

            </Tab.Navigator>
    );

}

export default MainRoutes;