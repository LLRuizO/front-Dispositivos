import React , {useEffect}from "react";
import {Menu,Footer} from '../pages/Home';
import { useAuth0} from "@auth0/auth0-react";
import {getUser} from '../api/user'

const PrivateRoute = ({children}) => {
    const {isAuthenticated, isLoading, getAccessTokenSilently,logout } = useAuth0();
    useEffect (()=> {
        if(isAuthenticated){
            const fetchAuthToken=async ()=>{
                // if(localStorage.getItem('token')){
    
                // }else{
    
                // }
                const accessToken=await getAccessTokenSilently({
                    audience:'https://misiontic-sprintmasters.us.auth0.com/api/v2/' 
            
                })
                localStorage.setItem('token',accessToken)
                let user=await getUser();
                if(user.role!='Inactivo' && user.active=='Autorizado'){
                    localStorage.setItem('user', JSON.stringify(user))
                }else{
                    alert('El usuario no está autorizado o no posee rol')
                    logout({ returnTo: window.location.origin })
                }
                

            }
    
            fetchAuthToken();
        }
    },[isAuthenticated]);

    
    if (isLoading) return <div>Loading...</div>

    return isAuthenticated ? ( <> {children}</>) :(<> <Menu/> <div className="text-5xl text">No esta autorizado para ver este sitio.</div><Footer/></>
    );


};

export default PrivateRoute;
