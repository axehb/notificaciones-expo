import React, {useState, useContext} from  'react';
import { StatusBar } from 'expo-status-bar';
import {View, ActivityIndicator} from 'react-native';

//formik
import {Formik} from 'formik';

//icons 
import {Octicons, Ionicons, Fontisto} from  '@expo/vector-icons';

//importamos async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//importamos las credenciales de contexto
import { CredencialesContexto } from './../components/CredentialsContext';

//colors


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

//colors
const {brand, darkLight, primary} = Colors;

//Keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//API client 
import axios from 'axios';

const Login = ({navigation}) => {

    const [ocultarPassword, setOcultarPassword] = useState(true);
    //create a state variable to display a message for login
    const [message, setMessage] = useState();
    //we want to know if we can or cannot login depending on the message
    const [messageType, setMessageType] = useState();

    //context 
    const {storedCredentials, setStoredCredentials} = useContext(CredencialesContexto);

    const handleLogin = (credentials, setSubmiting) => {
        const url = 'https://blooming-temple-99469.herokuapp.com/user/ingreso';
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
                    //if login was succesful we move to the welcome page and we pass the data too
                    //navigation.navigate('Welcome', {...data[0]});
                    persistLogin({ ...data[0] }, message, status);
                    //una vez añadido el persistLogin ya no tenemos que viajar a la pestaña welcome manualmente
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
                <PageLogo source = {require('./../assets/esp.png')}/>
                <PageTitle>Datos con ESP</PageTitle>
                <SubTitle>Iniciar sesión</SubTitle>
                {//formik is used for forms
                //It has inner functions like  setSubmitting and isSubmitting
                //we destructure setSubmitting since it is a prop
                }
                <Formik initialValues={{email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => { //it means when the form is submitted
                    if (values.email == '' || values.password == ''){
                        handleMessage("Por favor llena todos los campos");
                        //ya que no se esta cumpliendo el envio de datos (submit) ponemos a false
                        setSubmitting(false);
                    }
                    else {
                        handleLogin(values, setSubmitting);
                    }
                }}
                > 
                {//inner functions from formik that retain the input fields
                //handleChange Will run whenever input fields change
                //handleblur will run when input field loses focus
                //handlesubmit when the form is submitted
                //and values which are the input fields
                //we are also adding isSubmitting as an inner state
                }
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea> 
                            <MyTextInput 
                                label = "Correo electronico"
                                icon = "mail"
                                placeholder = "alguien@gmail.com"
                                placeholderTextColor = {darkLight}
                                onChangeText = {handleChange('email')}
                                onBlur = {handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />

                            <MyTextInput 
                                label = "Contraseña"
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
                                <ButtonText>Ingresar</ButtonText>
                            </StyledButton>
                            )}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                            )}
                            
                            <Line/>
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={primary} size={25}/>
                                <ButtonText google={true}>
                                    Registrarse con Google</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>¿No tienes una cuenta aún? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Signup')}>
                                <TextLinkContent>Registrarse</TextLinkContent>
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
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
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

export default Login;