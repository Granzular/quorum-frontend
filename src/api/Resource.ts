import type { Resource } from "../models";

export function getResources(): Promise<Resource[]>{
    return new Promise((resolve)=>{
        fetch("http://127.0.0.1:8000/api/library/resources/",{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then(data=>resolve(data.data))
        .catch(err=>console.log(err))
    });
}

export function getResource(resourceId:string|undefined): Promise<Resource>{

      return new Promise((resolve)=>{
        fetch("http://127.0.0.1:8000/api/library/resources/"+resourceId,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then(data=>resolve(data.data))
        .catch(err=>console.log(err))
    });
}