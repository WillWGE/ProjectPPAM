
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, HelperText, IconButton, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../contexts/AuthProvider";
import { useRoute } from '@react-navigation/native';

const backimage=require("../../assets/images/signup.png");


export default function SubjectForm() {
        const navigation =useNavigation();
        const {user}=useAuth();
        const route=useRoute();
        const [subject,setSubject]=useState(route.params?.item?.subject ?? "");
        const [description,setDescription]=useState(route.params?.item?.description ?? "");
        const [errors, setErrors] = useState({});
        

        const handleChange =setField => text => {
            setField(text);
            setErrors({})
        }
        const validate = () => {

            const newErrors = {};
    
            if (!subject) {
                newErrors.subject = "Subject is required";
            } else if (subject.length <= 3) {
                newErrors.subject = "Subject must be at least 4 characters";
            }
            if (!description) {
                newErrors.description = "Description is required";
            } else if (description.length <= 8) {
                newErrors.description = "Description must be at least 8 characters";
            }
    
            return newErrors;
    
        }
    
        const handleSubmit = async () => {
                const findErrors=validate();
                if (Object.values(findErrors)?.some(value => value !== "")) {
                    setErrors(findErrors);
                }else{
                    try {
                      if (route.params?.mode === 'create'){
                        await firestore().collection("Study_Subject").add({
                            userId: user.uid,
                            subject,
                            description,
                            createdAt: firestore.FieldValue.serverTimestamp(),
                            updatedAt: firestore.FieldValue.serverTimestamp(),
                        });
                      } else {
                            await firestore().collection('Study_Subject').doc(route.params?.item?.id).set({
                                subject:user.uid,
                                subject,
                                description,
                                updatedAt:firestore.FieldValue.serverTimestamp()
                            },{merge:true})
                      }
                    navigation.navigate("Home");
                    
                } catch (e) {
                    console.log("e", e)
                }
              }
            }
            
            return <View style={styles.container}>
               <Text variant="headlineLarge" style={styles.title}>{route.params?.mode === "create" ? "Create " : "Update "}Subject</Text>
               {/* <Text variant="titleLarge" style={styles.subtitile}>Login</Text> */}
               <View style={styles.formContainer}>
                   <TextInput
                       mode="outlined"
                       placeholder="Subject"
                       value={subject}
                       onChangeText={handleChange(setSubject)}
                       left={<TextInput.Icon icon="format-title" />}
                       autoFocus
                       error={errors?.subject ? true : false}
                   />
                    <HelperText
                        type="error"
                        visible={errors?.subject ? true : false}
                    >
                        {errors.subject}
                    </HelperText>

                   <TextInput
                       mode="outlined"
                       placeholder="Description"
                       value={description}
                       onChangeText={handleChange(setDescription)}
                       multiline
                       numberOfLines={5}
                       style={{ height: 200 }}
                       autoFocus
                       error={errors?.description ? true : false}
                   />
                        <HelperText
                            type="error"
                            visible={errors?.description ? true : false}
                        >
                            {errors.description}
                        </HelperText>
                   <View style={styles.btnContainer}>
                       <Button
                         
                           mode="contained" onPress={handleSubmit}>{route.params?.mode === "create" ? "Create" : "Update"}</Button>
                       <Text style={styles.or}>or</Text>
                       <Button onPress={() => navigation.navigate("Home")}>Back to Home</Button>
                   </View>
               </View>
           </View>
       
    }
   
   const styles = StyleSheet.create({
       background:{
           flex:1,
          
       },
       container: {
           flex: 1,
         
       },
       formContainer: {
           width: "100%",
           padding: 20,
           marginTop: 8,
       },
       btnContainer: {
           marginTop: 20,
           alignItems:'center'
       },
       btnContent:{
           width:"100%",
           backgroundColor: theme.colors.button,
           marginTop: 20,
           marginBottom:20,
           paddingVertical: 15,
           paddingHorizontal: 10,
           borderRadius: 30,
           borderWidth:1,
           marginHorizontal:20,
           textAlign:'center',
           color:theme.colors.white
       },
       title: {
           marginTop:'20%',
           color: theme.colors.primary,
           textAlign:'center'
       },
       subtitle: {
           color: theme.colors.primary,
           fontFamily:'Montserrat-Bold',
           fontWeight:'bold',
           textAlign:'center',
           marginTop:'20%'
       },
       signincont:{
           marginLeft:'15%',
           marginTop:'70%',
           flexDirection:'row',
       }
   })


