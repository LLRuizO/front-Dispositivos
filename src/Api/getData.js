import axios from 'axios';

export const getUserList = (page,countPerPage) => {
    return new Promise((resolve,reject)=>{
        axios.get(`https://enigmatic-hollows-40300.herokuapp.com/api/V1/dispositivos`).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    })
}