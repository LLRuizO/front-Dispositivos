//Importamos nuestro Layout
import LayoutProducts from "../layouts/LayoutProduct";
import LayoutBasic from "../layouts/LayoutBasic";
import LayoutProductRegistrer from '../layouts/LayoutRegisterProduct'
import LayoutVentas from '../layouts/LayoutVentas'
import LayoutEstadoventas from "../layouts/LayoutEstadoventas";
import LayoutUsuarios from "../layouts/LayoutUsuarios";

//Páginas usuarios
import Home from '../pages/Home';





//Otras páginas
import Error404 from "../pages/Admin/Error404"; 

const routes = [
           
    {
        path: "/",     //Hacemos referencia a la raiz.
        component: LayoutBasic, //Aquí solicitamos que componente tendremos como base
        exact: true, //False porque podemos encontrar diferentes raices: Contacto, notas, etc.
        //Nuestras rutas seran un array que contiene diferentes objetos
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/products",     //Hacemos referencia a la raiz.
        component: LayoutBasic, //Aquí solicitamos que componente tendremos como base
        exact: true, //False porque podemos encontrar diferentes raices: Contacto, notas, etc.
        //Nuestras rutas seran un array que contiene diferentes objetos
        routes: [
            {
                path: "/products",
                component:LayoutProducts,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/Productregistrer",     //Hacemos referencia a la raiz.
        component: LayoutBasic, //Aquí solicitamos que componente tendremos como base
        exact: true, //False porque podemos encontrar diferentes raices: Contacto, notas, etc.
        //Nuestras rutas seran un array que contiene diferentes objetos
        routes: [
            {
                path: "/Productregistrer",
                component:LayoutProductRegistrer,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },  
    {
        path: "/Ventas",     //Hacemos referencia a la raiz.
        component: LayoutBasic, //Aquí solicitamos que componente tendremos como base
        exact: true, //False porque podemos encontrar diferentes raices: Contacto, notas, etc.
        //Nuestras rutas seran un array que contiene diferentes objetos
        routes: [
            {
                path: "/Ventas",
                component:LayoutVentas,
                exact: true
            },
            {
                component: Error404
            }

            
        ]
    },
    {
        path: "/Estadoventas",     //Hacemos referencia a la raiz.
        component: LayoutBasic, //Aquí solicitamos que componente tendremos como base
        exact: true, //False porque podemos encontrar diferentes raices: Contacto, notas, etc.
        //Nuestras rutas seran un array que contiene diferentes objetos
        routes: [
            {
                path: "/Estadoventas",
                component:LayoutEstadoventas,
                exact: true
            },
            {
                component: Error404
            }


        ]
    },
    {
        path: "/usuarios",     //Hacemos referencia a la raiz.
        component: LayoutBasic, //Aquí solicitamos que componente tendremos como base
        exact: true, //False porque podemos encontrar diferentes raices: Contacto, notas, etc.
        //Nuestras rutas seran un array que contiene diferentes objetos
        routes: [
            {
                path: "/usuarios",
                component:LayoutUsuarios,
                exact: true
            },
            {
                component: Error404
            }


        ]
    }
];
export default routes;