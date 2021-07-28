import React, {useState} from 'react';



//screens
//import Login from './screens/Login';
//import Signup from './screens/Signup';
//import Welcome from './screens/Welcome';


//React navigation stack
import RootStack from './navigators/RootStack';

//Importamos app loading
import AppLoading from 'expo-app-loading';

//importamos async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//importamos las credenciales de contexto
import { CredencialesContexto } from './components/CredentialsContext';
//importamos la funcion para preguntar por push notfications
//import registroPushNotifications from './components/registroPushNotifications';
import * as Notifications from 'expo-notifications';
//import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
/* 
  useEffect(() => {
    let token = registroPushNotifications()
  }, []); 
 */
  //comprobaremos que async storage ya deja lanzar la app con useState
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  //stored credentials tiene que ser accesada por todos los componentes
  //por lo cual se usa Context

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('CredencialesApp')
      .then((result) => {
        if (result !== null){
          setStoredCredentials(JSON.parse(result)); //ya que todo lo que devuelve AsyncStorage son strings
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error))
  }

  if (!appReady) {
    return (
      <AppLoading 
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
      
      )
  }

//Para poder pasar los valores de las credenciales que tenemos aqui hacia el archivo 
//de contexto necesitamos usar un wrapper en el RootStack
//aqui dentro pasaremos el valor de las credenciales que hicimos con usestate 
//estas iran dentro de la propiedad value y deben tener el mismo formato que con el que 
//se definieron en el archivo de contexto  
//Todo esto se pasara al Rootstack ya que es el quien va a obtener el Login etc
//para que con lo que hicimos arriba finalmente determinemos lo que se le mostrara al usuario 

  return (
    <CredencialesContexto.Provider value={{storedCredentials, setStoredCredentials}}>
      <RootStack />
    </CredencialesContexto.Provider>


    /*
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/
  );
}

