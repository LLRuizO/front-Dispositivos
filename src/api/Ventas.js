import { basePath, apiVersion } from './config';

export function Ventas(data,method,id){
    const url = id?`${basePath}/${apiVersion}/register-sell/${id}`:`${basePath}/${apiVersion}/register-sell`;
    const params = {
        method: method?method:"POST",
        body: JSON.stringify(data),
        headers: {
            "accept":"application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };

    return new Promise((resolve,reject)=>{
        fetch(url, params)
        .then(response =>{
            console.log(response)
            return response.json();
        })
        .then(result =>{
            resolve({ ok: false, message: result.message });
        })
        .catch(err =>{
            reject({ok: false, message: err.message})
        });
    })
}

export function getVentas(data){
    const url = `${basePath}/${apiVersion}/register-sell`;
    const params = {
        method: "GET",
        headers: {
            "accept":"application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };

    return new Promise((resolve,reject)=>{
        fetch(url, params)
        .then(response =>{
            return response.json();
        })
        .then(result =>{
            resolve(result);
        })
        .catch(err =>{
            reject({ok: false, message: err.message})
        });
    })
}


export function deleteVentas(id){
    const url = `${basePath}/${apiVersion}/register-sell/${id}`;
    const params = {
        method: "DELETE",
        headers: {
            "accept":"application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };

    return new Promise((resolve,reject)=>{
        fetch(url, params)
        .then(response =>{
            return response.json();
        })
        .then(result =>{
            resolve(result);
        })
        .catch(err =>{
            reject({ok: false, message: err.message})
        });
    })
}