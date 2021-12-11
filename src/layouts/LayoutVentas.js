import React,{useState,useEffect} from "react";
import {Menu,Footer} from '../pages/Home';
import { Button,Input } from "reactstrap";
import {Ventas} from '../api/Ventas'
import {getRegisterProduct} from '../api/registerProduct'
import PrivateRoute from "../config/PrivateRouts";
import {getUsers} from '../api/user'

export default function LayoutVentas(props){
    
    return(
        <PrivateRoute>
            {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role=='Administrador' || JSON.parse(localStorage.getItem('user')).role=='Vendedor'?
            <Formulario/>
            :<><Menu/><div class="alert alert-danger" role="alert">
            Usuario no autorizado!
          </div><Footer/></>}
        </PrivateRoute>
    );
}

function Formulario(){
    /*estados iniciales del formualrio */
    const [form,setForm]=useState({})
    const [errors,setError]=useState({})
    const [products,setProducts]=useState({})
    const [users,setUsers]=useState({})
    //const [item,setItem]=useState({})
    


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
        if(field==="product"){
            let item= products.filter(o=> o.name==value)[0]
            //setItem(i);
            setForm({...form,[field]:value,"codigo":item?item._id:"","valorUnitario":item?item.price:""})
        }else if(field==="cant"){
            setForm({...form,[field]:value,"valorTotal":value*parseInt(form.valorUnitario?form.valorUnitario:0)})
        }else{
            setForm({...form,[field]:value})
        }

    }
    /*envío formulario */
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate()){
            Ventas(form).then(res=>{
                alert("Venta registrado")
                emptyProps()
            })
        }
    }
    

    const validate=()=>{
        let foundErrors={}
        let required="Este campo es requerido"
        if(!form["product"]) foundErrors.product=required
        if(!form["codigo"]) foundErrors.codigo=required
        if(!form["valorUnitario"]) foundErrors.valorUnitario=required
        if(!form["cant"]) foundErrors.cant=required
        if(!form["valorTotal"]) foundErrors.valorTotal=required
        if(!form["fechaVenta"]) foundErrors.fechaVenta=required
        if(!form["nombre"]) foundErrors.nombre=required
        if(!form["cedula"]) foundErrors.cedula=required
        if(!form["vendedor"]) foundErrors.vendedor=required
        if(!form["esSell"]) foundErrors.esSell=required
        
        setError(foundErrors)
        return Object.keys(foundErrors).length==0
    }
    /*vaciar formulario*/
    const emptyProps=()=>{
        setForm({})
    }

    const options = users.length>0?users.map(d => <option value={d.name}>{d.name}</option>):[];

    return (
        <React.Fragment>
            <Menu/>
            <div class="container">
                <center><h1>Registrar Ventas</h1></center>
                <form onSubmit={handleSubmit} class="row g-3">
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
                            name="codigo"
                            disabled
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.codigo?form.codigo:""}
                        />
                        {errors.codigo?<p style={{color:"red"}}>{errors.codigo}</p>:""}
                    </div>
                    
                    <div class="col-md-2">
                        <label for="inputValorUnitario" class="form-label">Valor Unitario</label>
                        <input type="number" class="form-control" 
                            placeholder="$"
                            disabled
                            name="valorUnitario"
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.valorUnitario?form.valorUnitario:""}
                        />
                        {errors.valorUnitario?<p style={{color:"red"}}>{errors.valorUnitario}</p>:""}
                    </div>
                       
                    <div class="col-md-2">
                        <label for="inputCantidad" class="form-label">Cantidad</label>
                        <input type="number" class="form-control" 
                            placeholder="Un"
                            name="cant"
                            min="1"
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.cant?form.cant:""}
                        />
                        {errors.cant?<p style={{color:"red"}}>{errors.cant}</p>:""}    
                    </div>
                     
                    <div class="col-md-2">
                        <label for="inputValorTotal" class="form-label">Valor Total</label>
                        <input type="number" class="form-control" 
                            placeholder="$"
                            name="valorTotal"
                            disabled
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.valorTotal?form.valorTotal:""}
                        />
                        {errors.valorTotal?<p style={{color:"red"}}>{errors.valorTotal}</p>:""} 
                    </div>
                       
                    <div class="col-md-2">
                        <label for="inputFechaVenta" class="form-label">Fecha de Venta</label>
                        <Input type="date" class="form-control" 
                            name="fechaVenta"
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.fechaVenta?form.fechaVenta:""}
                        />
                        {errors.fechaVenta?<p style={{color:"red"}}>{errors.fechaVenta}</p>:""} 
                    </div>
                                  
                    <div class="col-md-6">
                        <span class="input-group-text">Nombre Clientes</span>
                        <Input type="text" class="form-control"  
                            placeholder="Nombres y Appellidos"
                            name="nombre"
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.nombre?form.nombre:""}
                        />
                        {errors.nombre?<p style={{color:"red"}}>{errors.nombre}</p>:""}   
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
                                    <option value="Wilington Perenguez">Wilington Perenguez</option>
                                    */}
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
                                name="esSell"
                                onChange={(e)=>updateForm(e.target.value,e.target.name)}
                                value={form.esSell?form.esSell:""}
                            >
                                <option selected></option>
                                <option>Cancelado</option>
                                <option>Entregada</option>
                                <option>Proceso</option>
                            </select>
                        </div>
                        {errors.esSell?<p style={{color:"red"}}>{errors.esSell}</p>:""}
                    </div>
                    </div>
                    <center>            
                        <div class="col-12">
                            <button class="btn btn-success" type="submit">Aceptar  Venta</button>    
                            <button class="btn btn-danger" onClick={emptyProps}>Cancelar Venta</button>       
                        </div> 
                    </center>
                </form>
            </div>
            <Footer/>
        </React.Fragment>
    );
}