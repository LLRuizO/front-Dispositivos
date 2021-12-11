import { basePath, apiVersion } from './config';

export function registerProduct(data,method,id){
    console.log(data)
    const url = id?`${basePath}/${apiVersion}/register-products/${id}`:`${basePath}/${apiVersion}/register-products`;
    const params = {
        method: method?method:"POST",
        body: JSON.stringify(data),
        headers: {
            "accept":"application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    };

    return new Promise((resolve,reject)=>{
        fetch(url, params)
        .then(response =>{
            console.log(response)
            return response.json();
        })
        .then(result =>{
            /*if (result.product){
                return {ok: true, message: "Producto creado correctamente"};
            }*/
            resolve({ ok: false, message: result.message });
        })
        .catch(err =>{
            reject({ok: false, message: err.message})
        });
    })
}

export function getRegisterProduct(data){
    const url = `${basePath}/${apiVersion}/register-products`;
    const params = {
        method: "GET",
        headers: {
            "accept":"application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
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


export function deleteRegisterProduct(id){
    const url = `${basePath}/${apiVersion}/register-products/${id}`;
    const params = {
        method: "DELETE",
        headers: {
            "accept":"application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
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