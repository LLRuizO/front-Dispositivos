import axios from 'axios';

export const getUserList = (page,countPerPage) => {
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:3977/api/V1/dispositivos`).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    })
}