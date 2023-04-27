import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './contexts/AuthProvider';
import Home from './screens/home';
import Started from './screens/started';
import Landing from './screens/landing';
import Login from './screens/login';
import Register from './screens/register';
import Splash from './screens/splash';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { user } = useAuth();
    console.log("user",user)
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'
            >
                {!user &&
                    <>
                        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false }} />
                        <Stack.Screen name="Started" component={Started} options={{headerShown: false }} />
                        <Stack.Screen name="Landing" component={Landing} options={{headerShown:false}} />
                        <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
                        <Stack.Screen name="Register" component={Register} options={{title: 'Register',headerTitleStyle:{fontWeight:'bold'}}} />
                    </>}
                {user && <Stack.Screen name="Home" component={Home} options={{headerShown: false }} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
