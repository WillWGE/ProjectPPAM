

import { FlatList, StyleSheet, View, Alert,ImageBackground} from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";
import theme from "../../config/theme";

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const background=require("../../assets/images/homebackground.png");
export default function Home() {
        const navigation=useNavigation();
        const [data,setData]=useState([]);
        const {user}=useAuth();

        useEffect(()=>{
            const snapshot=firestore().collection("Study_Subject")
            .where("userId","==",user?.uid)
            .orderBy("createdAt","desc")
            .onSnapshot((snapshots)=>{
                const subject=[];
                snapshots.forEach((snapshots)=>{
                subject.push({
                    ...snapshots.data(),
                    id:snapshots.id,
                    // createdAt,
                    // description,
                    // subject,
                    // updateAt,
                    // userId
                    })
                })
                console.log("subject",subject)  
                setData(subject);
            })
            return ()=>{
                snapshot?.();
            }
        },[user?.uid])

        const handleDelete = item => e => {
            Alert.alert( 'Are you sure want to delete this subject?', [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
    
                        await firestore().collection("Study_Subject").doc(item.id).delete();
    
                    }
                },
            ]);
    
        }
        
       
        return <ImageBackground source={background} style={styles.background}>
        <Appbar>
            <Appbar.Content title="Your Subject" />
        </Appbar>
        <FlatList
            data={data}
            renderItem={({item})=>{
                const {subject,description}=item;
                return <List.Item
                    title={subject}
                    description={description}
                    right={props => <View {...props}>
                            <View style={styles.actionBtns}>
                                <IconButton onPress={() => navigation.navigate("SubjectForm", {
                                    mode: "update",
                                    item
                                })} icon="pencil" />
                                <IconButton
                                    onPress={handleDelete(item)}
                                    icon="delete" />
                            </View>
                        </View>}
                />
            }}
        />
        <FAB
            onPress={() => navigation.navigate("SubjectForm", { mode: "create" })}
            style={styles.fab}
            icon={"plus"}
        />
    </ImageBackground>
    

}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 20
    },
    subject: {
        color: theme.colors.primary,
        fontSize:32
    },
    description:{
        color: theme.colors.secondary
    },
    fab: {
        position: "absolute",
        right: 40,
        bottom: 40
    },
    actionBtns: {
        flexDirection: "row"
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
 

