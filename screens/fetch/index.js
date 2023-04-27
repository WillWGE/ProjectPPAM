// import { View,Text,FlatList,StyleSheet,Pressable} from "react-native";
// import React,{useState,useEffect} from 'react'
// import {firebase} from 'react-native'

// const Fetch=()=>{
//     const [users,setUsers]=useState([]);
//     const todoRef=firebase.firestore().collection('todos');

//     useEffect( () =>{
//         const fetchData=async() => {
//             todoRef
//             .onSnapshot(
//                 querySnapshot => {
//                     const users=[]
//                     querySnapshot.forEach((doc)=>{
//                         const {createdAt,description,subject,updateAt,userId}=doc.data()
//                         users.push({
//                             id:doc.id,
//                             createdAt,
//                             description,
//                             subject,
//                             updateAt,
//                             userId
//                         })
//                     })
//                     setUsers(users)
//                 }
//             )
//         };
//         fetchData();
//     },[])

//     return(
//         <View style={{flex:1,marginTop:100}}>
//             <FlatList
//                 style={{height:'100%'}}
//                 data={users}
//                 numColumns={1}
//                 renderItem={({item})=>(
//                     <Pressable style={Styles.container}>
//                         <View style={styles.innerContainer}>
//                                 <Text style={styles.itemHeading}>{item.description}</Text>
//                                 <Text style={styles.itemHeading}>{item.subject}</Text>
//                         </View>

//                     </Pressable>
//                 )}
//             />
//         </View>
//     )
// }

// export default Fetch

// const styles=StyleSheet.create({
//     container:{
//         backgroundColor:'#e5e5e5',
//         padding:15,
//         borderRadius:15,
//         margin:5,
//         marginHorizontal:10,
//     },
//     innerContainer:{
//         alignItems:'center',
//         flexDirection:'column',
//     },
//     itemHeading:{
//         fontWeight:'bold'
//     },
//     itemText:{
//         fontWeight:'300'
//     }

// })