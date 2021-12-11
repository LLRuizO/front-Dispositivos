import React,{useState} from "react";
import {Menu,Footer} from '../pages/Home';
import { Button } from "reactstrap";
import {registerProduct} from '../api/registerProduct'
import PrivateRoute from "../config/PrivateRouts";

export default function LayoutProductRegistrer(props){

    return(
       < PrivateRoute>
            {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role=='Administrador'?
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

    /*actualiza estado */
    const updateForm=(value,field)=>{
        setForm({...form,[field]:value})
    }
    /*envío formulario */
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate()){
            registerProduct(form).then(res=>{
                alert("Producto registrado")
                emptyProps()
            })
        }
    }
    

    const validate=()=>{
        let foundErrors={}
        let required="Este campo es requerido"
        if(!form["Nombre"]) foundErrors.Nombre=required
        //if(!form["IdProduct"]) foundErrors.IdProduct=required
        if(!form["EsProduct"]) foundErrors.EsProduct=required
        if(!form["Descripcion"]) foundErrors.Descripcion=required
        if(!form["City"]) foundErrors.City=required
        if(!form["ValorProduct"]) foundErrors.ValorProduct=required
        if(!form["Moneda"]) foundErrors.Moneda=required
        setError(foundErrors)
        return Object.keys(foundErrors).length==0
    }
    /*vaciar formulario*/
    const emptyProps=()=>{
        setForm({})
    }

    return (
        <React.Fragment>
            <Menu/>
            <div class="container">
                <form onSubmit={handleSubmit} class="row g-3">
                    <h1>Registre su producto</h1>
                    <div class="col-md-6">
                        <label for="inputNombreProducto" class="form-label">Nombre del Producto</label>
                        <input type="text" class="form-control" 
                            placeholder="Nombre del Producto"
                            name="Nombre"
                            value={form.Nombre?form.Nombre:""}
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                        />
                        {errors.Nombre?<p style={{color:"red"}}>{errors.Nombre}</p>:""}
                    </div>
                    {/*<div class="col-md-4">
                        <label for="inputIdProducto" class="form-label"> # Identificador del producto</label>
                        <input type="number" class="form-control" 
                            placeholder="# Identificador del producto"
                            name="IdProduct" 
                            value={form.IdProduct?form.IdProduct:""}
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                        />
                        {errors.IdProduct?<p style={{color:"red"}}>{errors.IdProduct}</p>:""}
                    </div>*/}
                    <div class="col-md-6">
                        <label for="inputState" class="form-label">Estado del producto</label>
                        <select id="inputState" 
                            class="form-select"
                            name="EsProduct"
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.EsProduct?form.EsProduct:""}
                        >
                            <option selected></option>
                            <option>Disponible</option>
                            <option>No Disponible</option>
                        </select>
                        {errors.EsProduct?<p style={{color:"red"}}>{errors.EsProduct}</p>:""}
                    </div>

                    <div class="col-12">
                        <label for="inputDescripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="inputDescripcion" rows="3"
                            name="Descripcion" 
                            value={form.Descripcion?form.Descripcion:""}
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                        ></textarea>
                        {errors.Descripcion?<p style={{color:"red"}}>{errors.Descripcion}</p>:""}
                    </div>
                    <div class="col-md-6">
                        <label for="inputCity" class="form-label">Ciudad de Ubicación</label>
                        <input type="text" class="form-control"  
                            placeholder="Ciudad de ubicación del Producto"
                            name="City" 
                            value={form.City?form.City:""}
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                        />
                        {errors.City?<p style={{color:"red"}}>{errors.City}</p>:""}
                    </div>
                    <div class="col-md-4">
                        <label for="inputValorProducto" class="form-label">Valor del producto</label>
                        <input type="number" class="form-control" 
                            name="ValorProduct" 
                            min="0"
                            value={form.ValorProduct?form.ValorProduct:""}
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                        />
                        {errors.ValorProduct?<p style={{color:"red"}}>{errors.ValorProduct}</p>:""}
                    </div>
                    <div class="col-md-2">
                        <label for="inputState" class="form-label">Moneda</label>
                        <select id="inputState" class="form-select"
                            name="Moneda"
                            onChange={(e)=>updateForm(e.target.value,e.target.name)}
                            value={form.Moneda?form.Moneda:""}
                        >
                        <option selected></option>
                        <option>COP</option>
                        <option>USD</option>
                        </select>
                        {errors.Moneda?<p style={{color:"red"}}>{errors.Moneda}</p>:""}
                    </div>
                    <div class="col-6">
                        <Button type="submit" class="btn btn-success">Registrar</Button>
                    </div>
                    <div class="col-6">
                        <Button  class="btn btn-success" onClick={emptyProps}>Borrar</Button>
                    </div>
                </form>
            </div>
            <Footer/>
        </React.Fragment>
    );
}