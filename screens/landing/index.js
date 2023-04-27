import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View,Image } from "react-native";
import { Button, Text } from "react-native-paper";
import theme from "../../config/theme";
const backimage=require("../../assets/studiu.png");

export default function Landing() {

    const navigation = useNavigation();

    return <View style={styles.container}>
                <Image source={backimage} style={styles.backimage}/>
                <Text variant="headlineLarge" style={styles.title}>Welcome to StudiU App!</Text>
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={() => navigation.navigate("Login")}>Login</Button>
                    <Text style={styles.or}>or</Text>
                    <Button mode="outlined" onPress={() => navigation.navigate("Register")}>Create a new account</Button>
                </View>
            </View>
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#7fffd4"
    },
    buttonContainer: {
        marginTop: 20
    },
    or: {
        alignSelf: "center"
    },
    title: {
        color: theme.colors.primary
    },
    backimage: {
        width:"100%",
        height:300
    }
})