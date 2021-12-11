import { basePath, apiVersion } from './config';

export function signUpApi(data){
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

   return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        if (result.user){
            return {ok: true, message: "Usuario creado correctamente"};
        }
        return { ok: false, message: result.message };
    })
    .catch(err =>{
        return {ok: false, message: err.message}
    });
}
export function getUser(){
    const url = `${basePath}/${apiVersion}/user/self`;
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

export function getUsers(){
    const url = `${basePath}/${apiVersion}/users`;
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

export function registerUsers(data,method,id){
    const url = id?`${basePath}/${apiVersion}/users/${id}`:`${basePath}/${apiVersion}/users`;
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
            resolve({ ok: false, message: result.message });
        })
        .catch(err =>{
            reject({ok: false, message: err.message})
        });
    })
}