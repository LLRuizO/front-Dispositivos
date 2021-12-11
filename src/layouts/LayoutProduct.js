import React, { useState,useEffect } from "react";
import {Menu,Footer} from '../pages/Home';
import {getRegisterProduct,deleteRegisterProduct,registerProduct} from '../api/registerProduct'
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


export default function LayoutProducts(props){
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);


    const user = null;

    return(
        <PrivateRoute>
            <Menu/>
            <LoadProducts/>
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

function LoadProducts(){
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [products,setProducts]=useState({})
    const [search,setSearch]=useState({})
    const [item,setItem]=useState({})
    const toggleEditProduct=()=>setModal(!modal);
    const [modal,setModal]=useState(false)
    const [formdata,setForm]=useState({})

    useEffect(()=>{
        getRegisterProduct().then(res=>{
            setProducts(res) 
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
        deleteRegisterProduct(item._id).then(res=>{
            getRegisterProduct()
            .then(res=>{
                setProducts(res) 
            });
            alert("Producto Eliminado Exitosamente")
        })
    }

    const buscar=(text)=>{
        const newData=search.filter(item=>{
			const buscadorData = item.name.toUpperCase().normalize('NFD').replace(/[\u0301]/g, "")+" "+item._id.toUpperCase().normalize('NFD').replace(/[\u0301]/g, "");
			const textData = text.toUpperCase().normalize('NFD').replace(/[\u0301]/g, "")
			return buscadorData.indexOf(textData) > -1
		})
        if(text=="")setProducts(search)
        else setProducts(newData);
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
                    <input class="form-control me-2" type="text" placeholder="Buscar" aria-label="Search" value={formdata.buscador} onChange={(value)=>buscar(value.target.value)}/>
                </form>    
            </div>
            <div className="container" style={{paddingTop:"50px"}}>
                <div className="wrapper">
                    {products.length>0?
                        products.map(item=>{
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
                                                <DropdownItem 
                                                    onClick={()=>toggleDelete(item)}
                                                >Eliminar</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        :""}
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{"Id producto: "+item._id}</p>
                                        <p className="card-text max-height">{item.description}</p>
                                        <center>
                                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" className="btn btn-outline-success">{item.money}</button>
                                            <button type="button" className="btn btn-outline-success">{'$'+item.price}</button>
                                            <button type="button" className="btn btn-outline-success">{item.stateProduct}</button>
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
            <EditProduct modal={modal} toggleEditProduct={toggleEditProduct} product={item} setProducts={setProducts}/>
        </React.Fragment>
    );
} 

const EditProduct=({modal,toggleEditProduct,product,setProducts})=>{
    /*estados iniciales del formualrio */
    const [form,setForm]=useState({})
    const [errors,setError]=useState({})

    useEffect(()=>{
        if(typeof product==='object'){
            setForm({...product})
        }
    },[product])   

    /*actualiza estado */
    const updateForm=(value,field)=>{
        setForm({...form,[field]:value})
    }
    /*envío formulario */
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate()){
            registerProduct(form,'PUT',form._id).then(res=>{
                toggleEditProduct();
                getRegisterProduct()
                .then(res=>{
                    setProducts(res) 
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
        if(!form["stateProduct"]) foundErrors.stateProduct=required
        if(!form["description"]) foundErrors.description=required
        if(!form["city"]) foundErrors.city=required
        if(!form["price"]) foundErrors.price=required
        if(!form["money"]) foundErrors.money=required
        setError(foundErrors)
        return Object.keys(foundErrors).length==0
    }
    /*vaciar formulario*/
    const emptyProps=()=>{
        setForm({})
    }

    return(
        <div>
            <Modal isOpen={modal} toggle={toggleEditProduct}>
                <ModalHeader>Producto</ModalHeader>
                <ModalBody>
                    <div class="container">
                        <form onSubmit={handleSubmit} class="row g-3">
                            <h1>Registre su producto</h1>
                            <div class="col-md-6">
                                <label for="inputNombreProducto" class="form-label">Nombre del Producto</label>
                                <input type="text" class="form-control" 
                                    placeholder="Nombre del Producto"
                                    name="name"
                                    value={form.name?form.name:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                />
                                {errors.name?<p style={{color:"red"}}>{errors.name}</p>:""}
                            </div>
                            <div class="col-md-4">
                                <label for="inputIdProducto" class="form-label"> # Identificador del producto</label>
                                <input type="text" class="form-control"  disabled="disabled"
                                    placeholder="# Identificador del producto"
                                    name="_id" 
                                    value={form._id?form._id:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                />
                                {errors._id?<p style={{color:"red"}}>{errors._id}</p>:""}
                            </div>
                            <div class="col-md-2">
                                <label for="inputState" class="form-label">Estado del producto</label>
                                <select id="inputState" 
                                    class="form-select"
                                    name="stateProduct"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.stateProduct?form.stateProduct:""}
                                >
                                    <option>Disponible</option>
                                    <option>No Disponible</option>
                                    {/* <option>No Disponible</option> */}
                                </select>
                                {errors.stateProduct?<p style={{color:"red"}}>{errors.stateProduct}</p>:""}
                            </div>

                            <div class="col-12">
                                <label for="inputDescripcion" class="form-label">Descripción</label>
                                <textarea class="form-control" id="inputDescripcion" rows="3"
                                    name="description" 
                                    value={form.description?form.description:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                ></textarea>
                                {errors.description?<p style={{color:"red"}}>{errors.description}</p>:""}
                            </div>
                            <div class="col-md-6">
                                <label for="inputCity" class="form-label">Ciudad de Ubicación</label>
                                <input type="text" class="form-control"  
                                    placeholder="Ciudad de ubicación del Producto"
                                    name="city" 
                                    value={form.city?form.city:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                />
                                {errors.city?<p style={{color:"red"}}>{errors.city}</p>:""}
                            </div>
                            <div class="col-md-4">
                                <label for="inputValorProducto" class="form-label">Valor del producto</label>
                                <input type="number" class="form-control" 
                                    name="price" 
                                    value={form.price?form.price:""}
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                />
                                {errors.price?<p style={{color:"red"}}>{errors.price}</p>:""}
                            </div>
                            <div class="col-md-2">
                                <label for="inputState" class="form-label">Moneda</label>
                                <select id="inputState" class="form-select"
                                    name="money"
                                    onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                    value={form.money?form.money:""}
                                >
                                <option>USD</option>
                                <option>COP</option>
                                {/* <option>USD</option> */}
                                </select>
                                {errors.money?<p style={{color:"red"}}>{errors.money}</p>:""}
                            </div>
                            <div class="col-12 pr-2 text-center">
                                <Button type="submit" class="btn btn-success">Editar Registro</Button>
                                <Button color="danger" onClick={toggleEditProduct}>cerrar</Button>
                            </div>
                        
                        </form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
        
    )
}