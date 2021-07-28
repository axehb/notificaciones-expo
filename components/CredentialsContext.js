//importamos el hook de react
import {createContext} from 'react';
//ahora creamos un contexto de las credenciales con este hook
//las propiedades tendran el mismo nombre las variables state
export const CredencialesContexto = createContext({storedCredentials: {}, setStoredCredentials: () => {}});
