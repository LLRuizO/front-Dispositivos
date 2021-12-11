import React, { useState,useEffect } from "react";
import {Menu,Footer} from '../pages/Home';
import { deleteVentas, Ventas, getVentas} from "../api/Ventas";
import {getRegisterProduct} from '../api/registerProduct'
import PrivateRoute from "../config/PrivateRouts";
import {getUsers} from '../api/user'
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
    Input
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./LayoutEstadoventas.scss";


export default function LayoutEstadoventas(props){
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);


    const user = null;

    return(
        <PrivateRoute>
            <Menu/>
            <LoadSells/>
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

function LoadSells(){
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [sells,setSells]=useState({})
    const [item,setItem]=useState({})
    const toggleEditSell=()=>setModal(!modal);
    const [modal,setModal]=useState(false)
    const [formdata,setForm]=useState({})
    const [search,setSearch]=useState({})

    useEffect(()=>{
        getVentas().then(res=>{
            setSells(res) 
            setSearch(res)
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
    const  toggleDelete=(item)=>{
        deleteVentas(item._id).then(res=>{
            getVentas()
            .then(res=>{
                setSells(res) 
            });
            alert("Venta Eliminada Exitosamente")
        })
    }

    const buscar=(text)=>{
        const newData=search.filter(item=>{
			const buscadorData = item.cedula.toString().toUpperCase().normalize('NFD').replace(/[\u0301]/g, "")+" "+item._id.toUpperCase().normalize('NFD').replace(/[\u0301]/g, "")+" "+item.name.toUpperCase().normalize('NFD').replace(/[\u0301]/g, "");
			const textData = text.toUpperCase().normalize('NFD').replace(/[\u0301]/g, "")
			return buscadorData.indexOf(textData) > -1
		})
        if(text=="")setSells(search)
        else setSells(newData);
        setForm({"buscador":text})
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
            <div className="row" style={{width:"50%",margin:"0 auto",paddingTop:"50px"}}>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" value={formdata.buscador} onChange={(value)=>buscar(value.target.value)}/>
                </form>    
            </div>
            <div className="container" style={{paddingTop:"50px"}}>
                <div className="wrapper">
                    {sells.length>0?
                        sells.map(item=>{
                            return(
                                <div className="card" key={item._id}>
                                    <div className="card-body">
                                        {
                                        JSON.parse(localStorage.getItem('user')).role=='Vendedor' || JSON.parse(localStorage.getItem('user')).role=='Administrador'?
                                        <UncontrolledDropdown setActiveFromChild>
                                            <DropdownToggle tag="a" className="nav-link">
                                                <img style={{width:"10%"}} src=" ../../img/puntos.png"/>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem 
                                                    onClick={()=>toggleEdit(item)}
                                                >Editar</DropdownItem>
                                                <DropdownItem 
                                                    onClick={()=>toggleDelete(item)}
                                                >Eliminar</DropdownItem>
                                            </DropdownMenu>
                                            
                                        </UncontrolledDropdown>
                                        :""}
                                        <h5 className="card-title">{"Factura: "+item._id}</h5>
                                        <p className="textItem">{"Comprador: "+item.name}</p>
                                        <p className="textItem">{"cedula: "+item.cedula}</p>
                                        <p className="textItem">{"producto: "+item.product}</p>
                                        <p className="textItem">{"cantidad: "+item.cant}</p>
                                        <p >{"valor unitario: $"+item.unitValue}</p>
                                        <p >{"vendedor: "+item.vendedor}</p>
                                        <center>
                                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" className="btn btn-outline-success">{item.saleDate}</button>
                                            <button type="button" className="btn btn-outline-success">{'$'+item.totalValue}</button>
                                            <button type="button" className="btn btn-outline-success">{item.state}</button>
                                            </div>
                                        </center>
                                    </div>
                                </div>

                               
                            )
                        })
                        :""
                    }
                   
                </div>
            </div>
            <Footer/>
            <EditProduct modal={modal} toggleEditSell={toggleEditSell} sell={item} setSells={setSells}/>
        </React.Fragment>
    );
} 

const EditProduct=({modal,toggleEditSell,sell,setSells})=>{
    /*estados iniciales del formualrio */
    const [form,setForm]=useState({})
    const [errors,setError]=useState({})
    const [products,setProducts]=useState({})
    const [users,setUsers]=useState({})


    useEffect(()=>{
        if(typeof sell==='object'){
            setForm({...sell})
        }
    },[sell])   

    useEffect(()=>{
        getRegisterProduct().then(res=>{
            setProducts(res) 
        })
        getUsers().then(res=>{
            setUsers(res.filter(o=>o.role=='Vendedor')) 
        })
    },[])

    /*actualiza estado */
    const updateForm=(value,field)=>{
        setForm({...form,[field]:value})
    }
    /*envío formulario */
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate()){
            Ventas(form,'PUT',form._id).then(res=>{
                toggleEditSell();
                getVentas()
                .then(res=>{
                    setSells(res) 
                });
                alert("Venta Editado Exitosamente")
            })
        }
    }
    

    const validate=()=>{
        let foundErrors={}
        let required="Este campo es requerido"

        if(!form["product"]) foundErrors.product=required
        if(!form["code"]) foundErrors.code=required
        if(!form["unitValue"]) foundErrors.unitValue=required
        if(!form["cant"]) foundErrors.cant=required
        if(!form["totalValue"]) foundErrors.totalValue=required
        if(!form["saleDate"]) foundErrors.saleDate=required
        if(!form["name"]) foundErrors.name=required
        if(!form["cedula"]) foundErrors.cedula=required
        if(!form["vendedor"]) foundErrors.vendedor=required
        if(!form["state"]) foundErrors.state=required

        setError(foundErrors)
        return Object.keys(foundErrors).length==0
    }

    const options = users.length>0?users.map(d => <option value={d.name}>{d.name}</option>):[];
         

    return(
        <div>
            <Modal isOpen={modal} toggle={toggleEditSell}>
                <ModalHeader>Estado de venta</ModalHeader>
                <ModalBody>
                    
                    <div class="container">
                        <form onSubmit={handleSubmit} class="row g-3">
                            <h1>Registre el Estado de su venta</h1>
                            <div class="col-md-2">
                                <label class="form-label">Producto</label>
                                <Input type="select" class="form-control" 
                                    placeholder="#"
                                    name="product"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.product?form.product:""}
                                >
                                    <option selected></option>
                                    {products.length>0?
                                        products.map((item,i)=>{
                                            return (<option value={item.name}>{item.name}</option>)
                                        })
                                    :""}
                                </Input>
                                {errors.product?<p style={{color:"red"}}>{errors.product}</p>:""} 
                            </div>
                            
                            <div class="col-md-2">
                                <label class="form-label">Codigo</label>
                                <Input type="text" class="form-control" 
                                    placeholder="#"
                                    name="code"
                                    disabled
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.code?form.code:""}
                                />
                                {errors.code?<p style={{color:"red"}}>{errors.code}</p>:""}
                            </div>
                            
                            <div class="col-md-2">
                                <label for="inputValorUnitario" class="form-label">Valor Unitario</label>
                                <input type="number" class="form-control" 
                                    placeholder="$"
                                    disabled
                                    name="unitValue"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.unitValue?form.unitValue:""}
                                />
                                {errors.unitValue?<p style={{color:"red"}}>{errors.unitValue}</p>:""}
                            </div>
                            
                            <div class="col-md-2">
                                <label for="inputCantidad" class="form-label">Cantidad</label>
                                <input type="number" class="form-control" 
                                    placeholder="Un"
                                    name="cant"
                                    min="0"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.cant?form.cant:""}
                                />
                                {errors.cant?<p style={{color:"red"}}>{errors.cant}</p>:""}    
                            </div>
                            
                            <div class="col-md-2">
                                <label for="inputValorTotal" class="form-label">Valor Total</label>
                                <input type="number" class="form-control" 
                                    placeholder="$"
                                    name="totalValue"
                                    disabled
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.totalValue?form.totalValue:""}
                                />
                                {errors.totalValue?<p style={{color:"red"}}>{errors.totalValue}</p>:""} 
                            </div>
                            
                            <div class="col-md-2">
                                <label for="inputFechaVenta" class="form-label">Fecha de Venta</label>
                                <Input type="date" class="form-control" 
                                    name="saleDate"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.saleDate?form.saleDate:""}
                                />
                                {errors.saleDate?<p style={{color:"red"}}>{errors.saleDate}</p>:""} 
                            </div>
                                        
                            <div class="col-md-6">
                                <span class="input-group-text">Nombre Clientes</span>
                                <Input type="text" class="form-control"  
                                    placeholder="Nombres y Appellidos"
                                    name="name"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.name?form.name:""}
                                />
                                {errors.name?<p style={{color:"red"}}>{errors.name}</p>:""}   
                            </div>
                            
                            <div class="col-md-6">
                                <span class="input-group-text">Cedula</span>
                                <Input type="number" class="form-control"  
                                    placeholder="CC"
                                    name="cedula"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.cedula?form.cedula:""}
                                />
                                {errors.cedula?<p style={{color:"red"}}>{errors.cedula}</p>:""} 
                            </div>
                            
                            <div class="col-md-6">
                                <div class="col-md-12">
                                    <label>Vendedor</label>
                                    <div class="form-floating">
                                        <Input type="select" name="select" id="exampleSelect"
                                            name="vendedor"
                                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                            value={form.vendedor?form.vendedor:""}
                                        >
                                            <option selected></option>
                                            {options}
                                            {/*<option value="Leidy Ruiz">Leidy Ruiz</option>
                                            <option value="Alejandro Ruiz">Alejandro Ruiz</option>
                                            <option value="Luz Helena Camach">Luz Helena Camacho</option>
                                    <option value="Wilington Perenguez">Wilington Perenguez</option>*/}
                                        </Input>
                                        {errors.vendedor?<p style={{color:"red"}}>{errors.vendedor}</p>:""}
                                    
                                    </div>
                                </div>
                                
                            </div>
                            <div class="col-md-6">
                            <div class="col-md-12">
                            <label for="floatingSelectGrid">Estado de la venta</label>
                                <div class="form-floating">
                                    <select id="inputState" 
                                        class="form-select"
                                        name="state"
                                        onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                        value={form.state?form.state:""}
                                    >
                                        <option selected></option>
                                        <option>Cancelado</option>
                                        <option>Entregada</option>
                                        <option>Proceso</option>
                                    </select>
                                </div>
                                {errors.state?<p style={{color:"red"}}>{errors.state}</p>:""}
                            </div>
                            </div>
                            

                            <div class="col-12 pr-2 text-center">
                                <Button type="submit" class="btn btn-success">Editar Registro</Button>
                                <Button color="danger" onClick={toggleEditSell}>Cerrar Registro</Button>
                            </div>
                        
                        </form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
        
    )
}