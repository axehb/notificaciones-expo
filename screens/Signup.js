import React, {useState, useContext} from  'react';
import { StatusBar } from 'expo-status-bar';

//formik
import {Formik} from 'formik';

//icons 
import {Octicons, Ionicons, Fontisto} from  '@expo/vector-icons';

//colors

//importamos async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//importamos las credenciales de contexto
import { CredencialesContexto } from './../components/CredentialsContext';


import {
    StyledContainer,
    InnerContainer,
    PageLogo, 
    PageTitle,
    SubTitle,
    StyledFormArea, 
    LeftIcon, 
    StyledInputLabel, 
    StyledTextInput, 
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './..//components/styles';

import {View, ActivityIndicator} from 'react-native';

//colors
const {brand, darkLight, primary} = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//API client 
import axios from 'axios';

const Signup = ({navigation}) => {

    const [ocultarPassword, setOcultarPassword] = useState(true);

    const [message, setMessage] = useState();
    //we want to know if we can or cannot login depending on the message
    const [messageType, setMessageType] = useState();
    //context 
    const {storedCredentials, setStoredCredentials} = useContext(CredencialesContexto);

    //form handling
    const handleSignup = (credentials, setSubmiting) => {
        const url = 'https://blooming-temple-99469.herokuapp.com/user/registro';
        //Cada vez que presionamos el boton estamos a la espera de un mensaje nuevo
        //Asi que tenemos que borrar el anterior al presionar el boton:
        handleMessage(null);

        //Remember data from signin is an array whereas for signup is an object
        //so we fetch data from the response coming from the promise .post()
        //we also deestructure the result

        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else{
                    //if signup was succesful we move to the welcome page and we pass the data too
                    //navigation.navigate('Welcome', {...data});
                    persistLogin({ ...data }, message, status);
                }
                //es decir no se estan enviando datos
                setSubmiting(false);
            })
            .catch(error => {
            console.log(error.JSON());
            //despues de tener un error tampoco se estaran enviando datos
            setSubmitting(false);
            handleMessage("Algo salió mal, comprueba tu conexión a internet e intentalo de nuevo");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        //if no type was passed then we assume is FAILED
        //we have message from the backend API
        setMessage(message);
        //we want to use type as a prop to style it different
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('CredencialesApp', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message,status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Falló el ingreso persistente');
        })
    }

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Boton con ESP</PageTitle>
                <SubTitle>Registrarse</SubTitle>
                {//formik is used for forms
                }
                <Formik initialValues={{name: '', email: '',  password: '', confirmPassword: '', telefono: ''}}
                onSubmit={(values, {setSubmitting}) => { //it means when the form is submitted
                    if (values.email == '' || values.password == '' || values.name == '' || values.confirmPassword == '' || values.telefono == ''){
                        handleMessage("Por favor llena todos los campos");
                        //ya que no se esta cumpliendo el envio de datos (submit) ponemos a false
                        setSubmitting(false);
                    } else if (values.password !== values.confirmPassword){
                        handleMessage("Por favor llena todos los campos");
                        setSubmitting(false);
                    }
                    else {
                        handleSignup(values, setSubmitting);
                    }
                }}
                > 
                {//functions that retains the input fields
                //handleChange Will run whenever input fields change
                //handleblur will run when input field loses focus
                //handlesubmit when the form is submitted
                //and values which are the input fields
                }
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                        <StyledFormArea> 
                            <MyTextInput 
                                label = "Nombre completo"
                                icon = "person"
                                placeholder = "Ricardo Alvarez"
                                placeholderTextColor = {darkLight}
                                onChangeText = {handleChange('name')}
                                onBlur = {handleBlur('name')}
                                value={values.name}
                            />

                            <MyTextInput 
                                label = "Correo electrónico"
                                icon = "mail"
                                placeholder = "alguien@gmail.com"
                                placeholderTextColor = {darkLight}
                                onChangeText = {handleChange('email')}
                                onBlur = {handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />

                            <MyTextInput 
                                label = "Whatsapp"
                                icon = "whatsapp"
                                placeholderTextColor = {darkLight}
                                onChangeText = {handleChange('telefono')}
                                onBlur = {handleBlur('telefono')}
                                value={values.telefono}
                            />

                            <MyTextInput 
                                label = "Contraseña"
                                icon = "lock"
                                placeholder = "* * * * * * * * "
                                placeholderTextColor = {darkLight}
                                onChangeText = {handleChange('confirmPassword')}
                                onBlur = {handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={ocultarPassword}
                                isPassword = {true}
                                hidePassword={ocultarPassword}
                                setHidePassword={setOcultarPassword}
                            />

                            <MyTextInput 
                                label = "Confirmar Contraseña"
                                icon = "lock"
                                placeholder = "* * * * * * * * "
                                placeholderTextColor = {darkLight}
                                onChangeText = {handleChange('password')}
                                onBlur = {handleBlur('password')}
                                value={values.password}
                                secureTextEntry={ocultarPassword}
                                isPassword = {true}
                                hidePassword={ocultarPassword}
                                setHidePassword={setOcultarPassword}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>

                            {
                                //mientras no se este submitiendo nada, el boton aparecera disponible
                            }
                            {!isSubmitting && (
                                <StyledButton onPress={handleSubmit}>
                                <ButtonText>Registrarse</ButtonText>
                            </StyledButton>
                            )}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                            )}

                            <Line/>
                            
                            <ExtraView>
                                <ExtraText>¿Ya tienes una cuenta? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                <TextLinkContent>Ingresar</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                    
                        </StyledFormArea>)}
                </Formik>
            </InnerContainer>

        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

{//used for the fields
}
const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (<View>
                {(icon=="whatsapp")&&(
                <LeftIcon>
                    <Fontisto name={icon} size={30} color={brand} />
                </LeftIcon>)}
                {(icon !=="whatsapp")&&(
                <LeftIcon>
                    <Octicons name={icon} size={30} color={brand} />
                </LeftIcon>
                )}
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledTextInput {...props} />
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                    {//Since it is going to be dynamic we make use of useState
                    }
                    </RightIcon>
                )}
            </View>);
};

export default Signup;