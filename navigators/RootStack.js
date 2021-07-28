import React from 'react';

import { Colors } from '../components/styles';
const {primary, tertiary} = Colors;

//importamos credencialesContexto
import { CredencialesContexto } from './../components/CredentialsContext';


//React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Historial from '../screens/Historial';
import Ajustes from './../screens/Ajustes';

const Stack = createStackNavigator();

//aqui encerramos lo que devuelve rootstack en el un consumidor de contexto que 
//que puede accesar a las variables guardadas en él
//este tiene que tener una funcion adentro y usar como parametros alguna de las
//variables guardadas en el contexto en este caso esta destructurada

const RootStack = () => {

    return(
        <CredencialesContexto.Consumer>
            {({storedCredentials}) => (
            <NavigationContainer>
                {
                    //We create a navigator with Stack.navigator
                }
                <Stack.Navigator 
                    screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle:{
                        paddingLeft: 15
                    }
                    }}
                    initialRouteName="Login"
                >
                {storedCredentials ? (
                    <>
                    <Stack.Screen options={{headerTintColor: primary}} name="Welcome"  component={Welcome} />
                    <Stack.Screen name="Historial" component={Historial} />
                    <Stack.Screen name="Ajustes" component={Ajustes} />
                    
                    </>
                ) : (
                    <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />

                    </>
                )
                    //Then we import the screens inside the variable Screen  
                    //si hay credenciales almacenadas entonces pasamos directo a la pantalla de welcome       
                }
                    
                </Stack.Navigator>
            </NavigationContainer>
        
            )}
        </CredencialesContexto.Consumer>
    )
}

export default RootStack;