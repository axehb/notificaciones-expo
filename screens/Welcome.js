import React, {useState, useContext} from  'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text} from 'react-native';

//formik
import {Formik} from 'formik';

//API client 
import axios from 'axios';

//icons 
import {Octicons, Ionicons, Fontisto} from  '@expo/vector-icons';

//importamos async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//importamos las credenciales de contexto
import { CredencialesContexto } from './../components/CredentialsContext';

//colors


import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea, 
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    WelcomeContainer,

} from './..//components/styles';

const Welcome = ({navigation}) => {
    
//create a state variable to display a message for login
const [message, setMessage] = useState();
//we want to know if we can or cannot login depending on the message
const [messageType, setMessageType] = useState();
//context 
const {storedCredentials, setStoredCredentials} = useContext(CredencialesContexto);
const {name, email,} = storedCredentials;



const clearLogin = () => {
    AsyncStorage.removeItem('CredencialesApp')
    .then(() => {
        setStoredCredentials('');
    })
    .catch(error => console.log(error));
};

    return (
        <>     
            <StatusBar style="black" />
            <InnerContainer>
                        
            <WelcomeContainer>     

                <PageTitle welcome={true}>Bienvenido</PageTitle>
                <SubTitle welcome= {true}>{name}</SubTitle>  
                <SubTitle welcome= {true}>{email}</SubTitle>  
                        <StyledFormArea>                      
                            
                            <StyledButton onPress={() => {navigation.navigate('Historial', {email})}}>
                                <ButtonText>Historial</ButtonText>
                            </StyledButton>
{/*                             <MsgBox type={messageType}>{message}</MsgBox>
                            {!notif && (<MsgBox>Hola</MsgBox>)} */}
                            <Line/>
                            <StyledButton onPress={() => {navigation.navigate('Ajustes', {email})}}>
                                <ButtonText> Ajustes</ButtonText>
                            </StyledButton>
                            <Line/>
                            <StyledButton onPress={clearLogin}>
                                <ButtonText>Salir</ButtonText>
                            </StyledButton>             
                    
                        </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>

        </>
    );
}



export default Welcome;