import React, { useState, useEffect } from "react";
import {
    Collapse,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from "@auth0/auth0-react";




function Home(){
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);


    const items = [
        {
          src: '../../img/Datacenter.png',
        },
        {
          src: 'img/tecno.png',
        },
        {
          src: 'img/sala de juntas.png',
        }
    ];
    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
                >
                <img src={item.src} alt={item.altText} style={{width:"100%"}}/>
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    
    return(
        <>
            <Menu/>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
            <Footer/>
        </>
    );
}

export const Menu=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { loginWithRedirect,logout, user, isAuthenticated, isLoading,  } = useAuth0();
    const [auxAuth,setAuth]=useState(false)
    const [animating, setAnimating] = useState(false);

   

    useEffect (( )=>{
        isAuthenticated?setAuth(true):setAuth(false)
    },[isAuthenticated])

    return(
        <Navbar light expand="sm" style={{backgroundColor:'#074943',marginBottom:"50px"}}>
            <NavbarBrand href="/">SPRINTMASTERS</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar style={{backgroundColor:'#074943'}}>
                <NavItem>
                    <NavLink  href="/usuarios" className="text" >Usuarios</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Ventas">Registro Ventas</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Estadoventas">Lista de Ventas</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Productregistrer">Registro de productos</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/products">Lista Productos</NavLink>
                </NavItem>
                <NavItem>
                    {!auxAuth ? <button onClick={() => loginWithRedirect()} class="btn btn-outline-light">Iniciar Sesión</button> :
                    <button  onClick={() => logout({ returnTo: window.location.origin })} class="btn btn-outline-light"> Cerrar Sesión</button>}
                </NavItem>

            </Nav>
            </Collapse>
        </Navbar>

    );
}

export const Footer=()=>{
    return(
        <section style={{paddingTop:"100px"}}>
            <footer class="text-center text-white" style={{backgroundColor: "#074943"}}>
                <div class="container p-4 pb-0">
                    <section class="">
                        <p class="d-flex justify-content-center align-items-center">
                            <span class="me-3" style={{backgroundColor: "#074943"}}>Contactanos</span>
                        </p>
                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="mailto:leidylorena9407@gmail.com" class="text-white">leidylorena9407@gmail.com</a>
                            </li>
                            <li>
                                <a href="mailto:wilington48@gmail.com" class="text-white">wilington48@gmail.com</a>
                            </li>
                            <li>
                                <a href="mailto:jamermartinez@hotmail.com" class="text-white">jamermartinez@hotmail.com</a>
                            </li>
                            <li>
                                <a href="mailto:luxajag@gmail.com" class="text-white">luxajag@gmail.com</a>
                            </li>
                            <li>
                                <a href="mailto:arf1993.11@gmail.com" class="text-white">arf1993.11@gmail.com</a>
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2020 Copyright:
                    <a class="text-white">sprintmasters.com</a>
                </div>
            </footer>
        </section>
    
    )
} 

export default  Home;