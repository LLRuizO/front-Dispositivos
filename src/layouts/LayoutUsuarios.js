import React, { useState,useEffect } from "react";
import {Menu,Footer} from '../pages/Home';
import {getUsers,registerUsers} from '../api/user'
import PrivateRoute from "../config/PrivateRouts";

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
    Button, 
    Modal,
    ModalHeader, 
    ModalBody, 
    ModalFooter
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./LayoutProducts.scss";


export default function LayoutUsers(props){
    return(
        <PrivateRoute>
            <Menu/>
            <LoadUsers/>
        </PrivateRoute>
    );
}

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

function LoadUsers(){
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [users,setUsers]=useState({})
    const [item,setItem]=useState({})
    const toggleEditUser=()=>setModal(!modal);
    const [modal,setModal]=useState(false)


    useEffect(()=>{
        getUsers().then(res=>{
            setUsers(res) 
        })
    },[])
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

    const toggleEdit =(item)=>{
        setItem(item)
        setModal(true)
    }


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

    return (
        <React.Fragment>
            <style>
                {
                `.custom-tag {
                    max-width: 100%;
                    height: 500px;
                    background: black;
                    }`
                }
            </style>
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
            <div className="container" style={{paddingTop:"50px"}}>
                <div className="wrapper">
                    {users.length>0?
                        users.map(item=>{
                            return(
                                <div className="card" key={item._id}>
                                    <div className="card-body">
                                        {JSON.parse(localStorage.getItem('user')).role=='Administrador'?
                                        <UncontrolledDropdown setActiveFromChild>
                                            <DropdownToggle tag="a" className="nav-link">
                                                <img style={{width:"10%"}} src=" ../../img/puntos.png"/>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem 
                                                    onClick={()=>toggleEdit(item)}
                                                >Editar</DropdownItem>
                                            </DropdownMenu>
                                            
                                        </UncontrolledDropdown>
                                        :""}
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{"Id User: "+item._id}</p>
                                        <p className="card-text">{"Email: "+item.email}</p>
                                        <p className="card-text">{"Rol: "+item.role}</p>
                                        <p className="card-text">{"active: "+item.active}</p>
                                    </div>
                                </div>

                               
                            )
                        })
                        :""
                    }
                   
                </div>
            </div>
            <Footer/>
            <EditUser modal={modal} toggleEditUser={toggleEditUser} user={item} setUsers={setUsers}/>
        </React.Fragment>
    );
} 

const EditUser=({modal,toggleEditUser,user,setUsers})=>{
    /*estados iniciales del formualrio */
    const [form,setForm]=useState({})
    const [errors,setError]=useState({})

    useEffect(()=>{
        if(typeof user==='object'){
            setForm({...user})
        }
    },[user])   

    /*actualiza estado */
    const updateForm=(value,field)=>{
        setForm({...form,[field]:value})
    }
    /*envío formulario */
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate()){
            registerUsers(form,'PUT',form._id).then(res=>{
                toggleEditUser();
                getUsers()
                .then(res=>{
                    setUsers(res) 
                });
                alert("Producto Editado Exitosamente")
            })
        }
    }
    

    const validate=()=>{
        let foundErrors={}
        let required="Este campo es requerido"
        if(!form["name"]) foundErrors.name=required
        if(!form["_id"]) foundErrors._id=required
        if(!form["active"]) foundErrors.active=required
        if(!form["email"]) foundErrors.email=required
        if(!form["role"]) foundErrors.role=required
        setError(foundErrors)
        return Object.keys(foundErrors).length==0
    }
    /*vaciar formulario*/
    const emptyProps=()=>{
        setForm({})
    }

    return(
        <div>
            <Modal isOpen={modal} toggle={toggleEditUser}>
                <ModalHeader>Usuario</ModalHeader>
                <ModalBody>
                    <div class="container">
                        <form onSubmit={handleSubmit} class="row g-3">
                            <h1>Editar Usuario</h1>
                            <div class="col-md-6">
                                <label for="inputNombreUsuario" class="form-label">Nombre del Usuario</label>
                                <input type="text" class="form-control" disabled="disabled" 
                                    placeholder="Nombre del Usuario"
                                    name="name"
                                    value={form.name?form.name:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                />
                                {errors.name?<p style={{color:"red"}}>{errors.name}</p>:""}
                            </div>
                            <div class="col-md-6">
                                <label for="inputIdUsuario" class="form-label"> # Identificador de Usuario</label>
                                <input type="text" class="form-control"  disabled="disabled"
                                    placeholder="# Identificador del Usuario"
                                    name="_id" 
                                    value={form._id?form._id:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                />
                                {errors._id?<p style={{color:"red"}}>{errors._id}</p>:""}
                            </div>
                            
                            <div class="col-12">
                                <label for="inputState" class="form-label">Rol</label>
                                <select id="inputState" 
                                    class="form-select"
                                    name="role"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.role?form.role:""}
                                >
                                    <option>Inactivo</option>
                                    <option>Vendedor</option>
                                    <option>Administrador</option>
                                </select>
                                {errors.role?<p style={{color:"red"}}>{errors.role}</p>:""}
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail" class="form-label">Email</label>
                                <input type="text" class="form-control"  
                                    placeholder="Email" disabled="disabled"
                                    name="email" 
                                    value={form.email?form.email:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                />
                                {errors.email?<p style={{color:"red"}}>{errors.email}</p>:""}
                            </div>
                            <div class="col-md-6">
                                <label for="inputState" class="form-label">Estado del Usuario</label>
                                <select id="inputState" 
                                    class="form-select"
                                    name="active"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.active?form.active:""}
                                >
                                    <option>Pendiente</option>
                                    <option>No Autorizado</option>
                                    <option>Autorizado</option>
                                    {/* <option>No Disponible</option> */}
                                </select>
                                {errors.active?<p style={{color:"red"}}>{errors.active}</p>:""}
                            </div>
                            <div class="col-12 pr-2 text-center">
                                <Button type="submit" class="btn btn-success">Editar Registro</Button>
                                <Button color="danger" onClick={toggleEditUser}>cerrar</Button>
                            </div>
                        
                        </form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
        
    )
}