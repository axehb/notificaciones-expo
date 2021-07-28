import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity, ProgressViewIOSComponent} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9",
    green: "#10B981",
    red: "#EF4444",
};

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};

`
export const InnerContainer = styled.View`
    flex: 1;
    width: 100%
    align-items: center;
`
//for the welcome page

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10ox;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 50px;
    min-width: 100%;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`
export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;

    ${(props) => props.welcome && `
        font-size: 35px;
    `}
`
export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;
//for the fields
export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary}; 
`

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;
//for the eye...
export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;
//for login button
//inside we check if the prop google is true, if so we add another style
export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
    `}

`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.google == true && `
    padding: 25px;
    `}

`

//for message box between login button and password box


export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? green : red};
    
`
//for message line after login button

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`

//texto debajo de registrarse 

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

//boton para la pagina de registro

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`

export const HistorialContainer = styled.View`
    flex: 1;
    marginTop: 90px;
    width: 100%;
    

`

export const AjustesContainer = styled.View`
    flex: 1;
    paddingTop: 70px;
    width: 100%;
    align-items: flex-start;
    justifyContent: flex-start;
    paddingHorizontal: 10px;
`

export const ContBotones = styled.View`
    flex: 1;
    paddingTop: 10px;
    width: 100%;

    paddingHorizontal: 10px;
`

export const VistaFlatList = styled.Text`
   
    paddingLeft: 5px;
    backgroundColor: ${primary};
    borderBottomWidth: 1px;
    borderBottomColor: ${darkLight};
    height: 80px;
    justifyContent: center;

`

export const ItemFlasList = styled.Text`
    fontSize: 18px;

`

export const VistaFilaBotones = styled.View`
    flex: 1;
    ${'' /* flex-wrap: nowrap; */}
    flex-direction: row;
    height: 60px;
    width: 100%
    justifyContent: center;
    align-items: center;

`
export const Flat = styled.FlatList`
    height: 500px;
`
export const BotonHistorial = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    margin-horizontal: 5px;
    width: 50px;
    height: 60px;

    ${(props) => props.Letras == true && `
    width: 160px;
    `}

`;

export const Cuenta = styled.Text`
    fontSize: 22px;

`