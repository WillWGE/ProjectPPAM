import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react'
import { StyleSheet, View,ImageBackground,useState } from "react-native";
import { Button, Text } from "react-native-paper";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Account from '../account';
import Subject from '../subject';
import StopWatchTimer from "../../utils";
import Login from '../login';

const Tab=createBottomTabNavigator();


function Main () {
    // const handleLogout = () => {
    //     auth().signOut();
    // }
    return (
            <View style={styles.container}>
                    <View style={styles.Text}>
                        <Text variant="headlineLarge" style={{fontFamily:'Montserrat-Regular'}}>Dashboard</Text>
                        
                        <Text variant="headlineLarge" style={styles.title}>Your Study</Text>
                    </View>
                    <View style={styles.timerWrapper}>
                    <StopWatchTimer/>
                    </View>
            </View>
    );
};

export default function Home() {

    return (
    <Tab.Navigator initialRouteName="Main">
                <Tab.Screen name="Main" component={Main} options={{headerShown: false,tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="home" color={color} size={size}/>),}}/>
                <Tab.Screen name="Subject" component={Subject} options={{headerShown: false,tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="book" color={color} size={size}/>),}} />
                <Tab.Screen name="Account" component={Account} options={{headerShown: false,tabBarIcon:({color,size}) =>(<MaterialCommunityIcons name="account" color={color} size={size}/>),}}/>
    </Tab.Navigator>
    )
    }
       
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#4DC868',
        alignItems:'center',
        justifyContent:'center',
    },
    Text:{
        paddingVertical:20
    },
    buttonContainer: {
        marginTop: 20
    },
    title: {
        fontFamily:'Montserrat-Bold',
        color:'white'
    },
    timer:{
        flex:1,
    },
    timerWrapper: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:0,
      },
    fab:{
        position:'absolute',
        right:20,
        bottom:20,
    }
})

