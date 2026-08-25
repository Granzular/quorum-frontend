import type { Course } from "../models"

export const getCourses = async ()=>{
    const response:Promise<Course[]> = fetch("http://127.0.0.1:8000/api/library/courses/",{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        return data.results
    })
    .catch(err=>console.log(err))

    return await response
}