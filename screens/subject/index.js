import React, {Component} from 'react';
import { Alert,StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text  }  from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


export default function Subject(){
    const navigation = useNavigation();
  
        return(
            <View style={styles.container}>
                <Text>Subject</Text>
            <FAB 
            onPress={() => navigation.navigate("SubjectForm", { mode: "create" })} 
            style={styles.fab}
            icon={"plus"}
            />  
            </View>
            );
     }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 20
    },
    title: {
        fontFamily:'sans-serif'
    },
    fab:{
        position:'absolute',
        right:20,
        bottom:20,
    }
})

