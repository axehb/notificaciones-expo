import React, {useState, useEffect} from  'react';
import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, FlatList, Text} from 'react-native';

//icons 
import {Octicons, Ionicons, Fontisto, AntDesign} from  '@expo/vector-icons';

//API client 
import axios from 'axios';

import {
    HistorialContainer,
    StyledButton,
    ButtonText,
    Line,
    ItemFlasList,
    VistaFlatList,
    MsgBox,
    VistaFilaBotones,
    Flat, BotonHistorial, Cuenta
} from '../components/styles';

const Historial = ({navigation, route}) => {

    useEffect(() => {
        handleHistorial();
      },[]);
    //fecha modificable
    const f = new Date();
    //fecha real
    const d = new Date();
    const [datos, setDatos] = useState([]);
      //create a state variable to display a message for login
    const [message, setMessage] = useState();
    //we want to know if we can or cannot login depending on the message
    const [messageType, setMessageType] = useState();
    const [cargando, setCargando] = useState(false);
    const [dias, setDias] = useState(0);

    const [diasBuscados, setDiasBuscados] = useState();
    const [mesesBuscados, setMesesBuscados] = useState();
    const [aniosBuscados, setAniosBuscados] = useState();

    
    const handleHistorial = () => {
    // const d = new Date();
    const fecha = {anio: f.getFullYear(), mes: (f.getMonth() + 1), dia: f.getDate()};
    setDiasBuscados(fecha.dia);
    setMesesBuscados(fecha.mes);
    setAniosBuscados(fecha.anio);
    const url = 'https://blooming-temple-99469.herokuapp.com/user/registros';
    //Cada vez que presionamos el boton estamos a la espera de un mensaje nuevo
    //Asi que tenemos que borrar el anterior al presionar el boton:
    console.log((f.getMonth() + 1)+"/"+f.getDate())
    handleMessage(null);
    axios
        .post(url, fecha)
        .then((response) => {
            const result = response.data;
            let {message, status, data} = result;
            let array = [];
            handleMessage(message, status);
            setCargando(true);
            
            if(status == 'SUCCESS'){
                let i;
                //let final;
                const fLen = data.length;
                for (i = 0; i < fLen; i++) {
                    //array[i].id = i+1;
                    data[i].id = String(i+1);
                    data[i].anio.toString();
                    data[i].mes.toString();
                    data[i].dia.toString();
                    data[i].hora.toString();
                    data[i].minuto.toString();

                    if(data[i].mes<10){
                        data[i].mes = "0"+data[i].mes;
                    }
                    if(data[i].dia<10){
                        data[i].dia = "0"+data[i].dia;
                    }
                    if(data[i].hora<10){
                        data[i].hora = "0"+data[i].hora;
                    }
                    if(data[i].minuto<10){
                        data[i].minuto = "0"+data[i].minuto;
                    }
                    array.push({anio: data[i].anio, mes: data[i].mes, dia: data[i].dia, hora: data[i].hora, minuto: data[i].minuto, id: String(i+1)})
                }

                    array.sort((a, b) => {return a.hora - b.hora});
                  /* for (i = 0; i < fLen; i++){
                    datos[i] = {anio: data[i].anio, mes: data[i].mes, dia: data[i].dia, hora: data[i].hora, minuto: data[i].minuto, id: data[i].id.toString()};
                  } */
                  setDatos(array);
                }
            else{
                setDatos([]);
            }
            
        })
        .catch(error => {
        //console.log(error.JSON());
        //despues de tener un error tampoco se estaran enviando datos
        //"Algo salió mal, comprueba tu conexión a internet e intentalo de nuevo"+d.getFullYear()+" "+(d.getMonth()+1)+" "+d.getDate()
        //handleMessage("Algo salió mal, comprueba tu conexión a internet e intentalo de nuevo "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear());
        handleMessage(error.message+fecha.dia+"/"+fecha.mes+"/"+fecha.anio);

        })
        .finally(() => {setCargando(false);
        //handleMessage(String(datos[0].hora));
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        //if no type was passed then we assume is FAILED
        //we have message from the backend API
        setMessage(message);
        //we want to use type as a prop to style it different
        setMessageType(type);
    }

    const regresaFecha = (valor) => {
        f.setDate(f.getDate()+valor); 
        return f.getFullYear()+"/"+(f.getMonth()+1)+"/"+f.getDate();
    }

    const titulo = (dias, meses, anios) => {
        let dia, mes;
        if (dias < 10)
            dia = "0"+dias;
        else
            dia = dias;
        if (meses < 10)
            mes = "0"+meses;
        else 
            mes = meses;

        if (d.getDate() == dias){
            return "Momentos de hoy: "+dia+"/"+mes+"/"+anios+" en que fue accionado el botón";
        }
        else{        
            return "Momentos del día: "+dia+"/"+mes+"/"+anios+" en que se accionó el botón";
        }
    }


    const arreglo = [];
    arreglo[0] = {name: "No hay datos para mostrar", id: "1"};

     
    return (
        <>
            <StatusBar style="black" />
            <HistorialContainer>
            {(datos.length) ? (
            <>
            <Text style= {styles.titulo}>{
                //"Momentos de"+diasBuscados+"/"+mesesBuscados+"/"+aniosBuscados
                titulo(diasBuscados,mesesBuscados,aniosBuscados)
                }</Text>
                 <Flat 
                    
                    keyExtractor = {(item) => item.id}
                    data ={datos}
                    renderItem={({item}) =>  (
                        <VistaFlatList>
                       <ItemFlasList>HH:MM      {item.hora}:{item.minuto}</ItemFlasList>
                       </VistaFlatList>
                    )}
                    refreshing = {cargando}
                    onRefresh = {handleHistorial}
                />
            </>
            ) :
            (
                <Flat 
                    
                    keyExtractor = {(item) => item.id}
                    data ={arreglo}
                    renderItem={({item}) =>  (
                        <VistaFlatList>
                       <ItemFlasList>{item.name}</ItemFlasList>
                       </VistaFlatList>
                    )}
                    refreshing = {cargando}
                    onRefresh = {handleHistorial}
                />
            )}
                 
                <MsgBox type={messageType}>{message}</MsgBox>
                <VistaFilaBotones>
                    <BotonHistorial onPress={() => {setDias(dias-1)}}>
                    <AntDesign name="caretleft" size ={15} color="white"/>
                    </BotonHistorial>
                    <Cuenta>{regresaFecha(dias)}</Cuenta>
                    <BotonHistorial onPress={() => {setDias(dias+1)}}>
                    <AntDesign name="caretright" size ={15} color="white"/>
                    </BotonHistorial>
                    <BotonHistorial Letras={true} onPress={handleHistorial}>
                        <ButtonText>Buscar</ButtonText>
                    </BotonHistorial>  
                </VistaFilaBotones>
            </HistorialContainer>
        </>    
    );
    
    
 
    
}


const styles = StyleSheet.create({
    

    titulo: {
        fontSize: 20,
        alignItems: "center"
    }
});



export default Historial;