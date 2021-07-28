import React, {useState, useEffect} from  'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import {View, ActivityIndicator, StyleSheet, Text, Pressable} from 'react-native';
//registerForPushNotifications.js
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
//icons 
import {Octicons, Ionicons, Fontisto} from  '@expo/vector-icons';

import {
    AjustesContainer,
    MsgBox,StyledButton,ButtonText,ContBotones
} from './../components/styles';

//importamos la funcion para preguntar por push notfications
//import registroPushNotifications from './../components/registroPushNotifications';

//API client 
import axios from 'axios';
//import { onChange } from 'react-native-reanimated';

const Ajustes = ({navigation, route}) => {

  const [token, setToken] = useState('');

  useEffect(() => {
    registroPushNotifications().then(expoToken => {
      setToken(String(expoToken));
    })
    /* estadoNotificacionesInicio();
    actualizarNotificaciones(); */
    //estadoNotificacionesInicio();
  },[]);

  

  const registroPushNotifications = async () => {
    let expoToken;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        
        expoToken = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(expoToken);
        //this.setState({ expoPushToken: token });
        //return (token);
        // setToken(String(expoToken));
        // console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return expoToken;
  } 

  const {email} = route.params;

  const [checked1, onChange1] = useState(false);
  const [checked2, onChange2] = useState(false);
  const [checked3, onChange3] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  //we want to know if we can or cannot login depending on the message
  const [messageType, setMessageType] = useState("SUCCESS");
  const [message, setMessage] = useState("Pulse Actualizar para empezar a modificar sus preferencias");


  const estadoNotificacionesInicio = () => {
    const usuarioEmail = {email};
    const url = 'https://blooming-temple-99469.herokuapp.com/user/estado';
    axios
        .post(url, usuarioEmail)
        .then((response) => {
            const result = response.data;
            let {message, status, data} = result;
            
            //console.log(data[0].notif);

            handleMessage(null);
            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                
                
            } else{
              //Actualizamos las preferencias en la aplicacion
              onChange1(data[0].notif);
              onChange2(data[0].notifCorreo);
              onChange3(data[0].notifWhatsapp);
              handleMessage(message, status);              
              //return;
            }

        })
        .catch(error => {
        //console.log(error);
        //console.log();
        handleMessage(null);
        handleMessage("Algo salió mal, comprueba tu conexión a internet e intentalo de nuevo ");
    })
  }

  const enviarToken = () =>{
    const url = 'https://blooming-temple-99469.herokuapp.com/user/token';
    axios
          .post(url, {email, notif: checked1, token})
          .then((response) => {
              const result = response.data;
              const {message, status} = result;

              handleMessage(null);
              if (status !== 'SUCCESS') {    
                  handleMessage(message, status);

                  
              } else{
                  //Enviamos la fecha encontrada y debido a que la buscamos y no la salvamos, la info
                  //se regresa en forma de arreglo
                  handleMessage(message, status);
                
              }
          })
          .catch(error => {
          handleMessage(null);
          //console.log(error.JSON());
          handleMessage("Algo salió mal, comprueba tu conexión a internet e intentalo de nuevo ");
      })
  }

  const actualizarNotificaciones = () => {
    if (token !== ''){
      enviarToken();
    }
  }

  const actualizarPreferencias = () =>{
    const url = 'https://blooming-temple-99469.herokuapp.com/user/preferencias';
    axios
          .post(url, {email, notifCorreo: checked2, notifWhatsapp: checked3})
          .then((response) => {
              const result = response.data;
              const {message, status} = result;

              handleMessage(null);
              if (status !== 'SUCCESS') {    
                  handleMessage(message, status);

                  
              } else{
                  //Enviamos la fecha encontrada y debido a que la buscamos y no la salvamos, la info
                  //se regresa en forma de arreglo
                  handleMessage(message, status);
                
              }
          })
          .catch(error => {
          handleMessage(null);
          //console.log(error.JSON());
          handleMessage("Algo salió mal, comprueba tu conexión a internet e intentalo de nuevo ");
      })
  }

  const handleMessage = (message, type = 'FAILED') => {
    //if no type was passed then we assume is FAILED
    //we have message from the backend API
    setMessage(message);
    //we want to use type as a prop to style it different
    setMessageType(type);
}

//actualizarNotificaciones();

    return (
        <>
    <StatusBar style="black" />
    <AjustesContainer>
    
      <Text style={styles.appTitle}>Envio de notificaciones</Text>

      <View style={styles.checkboxContainer}>
        <MyCheckbox
          ident = "Notificaciones"
          checked={checked1}
          onChange={onChange1}
          email = {email}
          actualizarPreferencias = {actualizarNotificaciones}
          buttonStyle={styles.checkboxBase}
          activeButtonStyle={styles.checkboxChecked}
          inactiveButtonStyle={styles.checkboxDisabled}
          habilitar = {actualizar}

          />
        <Text style={styles.checkboxLabel}>Activar notificaciones</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <MyCheckbox
          ident = "Correo"
          checked={checked2}
          onChange={onChange2} 
          email = {email}
          actualizarPreferencias = {actualizarPreferencias}
          buttonStyle={styles.checkboxBase}
          activeButtonStyle={styles.checkboxChecked}
          inactiveButtonStyle={styles.checkboxDisabled}
          habilitar = {actualizar}

          />
        <Text style={styles.checkboxLabel}>{`Enviar correo`}</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <MyCheckbox
          ident = 'Telegram'
          checked={checked3}
          onChange={onChange3}
          email = {email}
          actualizarPreferencias = {actualizarPreferencias}
          buttonStyle={styles.checkboxBase}
          activeButtonStyle={styles.checkboxChecked}
          inactiveButtonStyle={styles.checkboxDisabled}
          habilitar = {actualizar}
          />
        <Text style={styles.checkboxLabel}>{`Enviar a Whatsapp`}</Text>
      </View>

      <MsgBox type={messageType} >{message} </MsgBox>
      <ContBotones>
        <StyledButton onPress={() => {
          estadoNotificacionesInicio();
          // actualizarNotificaciones();
          // actualizarPreferencias();
          setActualizar(true);
          }}>
          <ButtonText> Actualizar</ButtonText>
        </StyledButton>
        <StyledButton disabled={!actualizar} onPress={() => {
          actualizarNotificaciones();
          actualizarPreferencias();
          }}>
          <ButtonText> Enviar</ButtonText>
        </StyledButton>
      </ContBotones>
    </AjustesContainer>

        </>
    );
}

const MyCheckbox = ({checked, 
    onChange,
    buttonStyle,
    activeButtonStyle,
    inactiveButtonStyle,
    actualizarPreferencias,
    habilitar,
    token,
    activeIconProps,
    inactiveIconProps, 
    ident
    }) => {
    



    const onCheckmarkPress = () => {
      onChange(!checked);
      //actualizarPreferencias();
    }


 //falta poner la propiedad inactiveButtonStyle en cada boton 
    return (
      <View>
      <Pressable
        style={[buttonStyle, 
          checked
          ? activeButtonStyle
          : inactiveButtonStyle,]}
        disabled= {!habilitar}
        onPress={onCheckmarkPress}>
        {checked && <Ionicons name="checkmark" size={24} color="black" />}
        
       
      </Pressable>
      </View>
    );
  }




const styles = StyleSheet.create({
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'coral',
      backgroundColor: 'transparent',
    },
  
    checkboxChecked: {
      backgroundColor: 'coral',
    },

    checkboxDisabled: {
      backgroundColor: 'white',
    },
  
    appContainer: {
      flex: 1,
      alignItems: 'center',
    },
  
    appTitle: {
      marginVertical: 16,
      fontWeight: 'bold',
      fontSize: 18,
    },
  
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
  
    checkboxLabel: {
      marginLeft: 8,
      fontSize: 18,
    }
  });

  export default Ajustes;