import type { Course } from "../models"

export const getCourses = async ()=>{
    // paginaated response
    const response:Promise<Course[]> = fetch("http://127.0.0.1:8000/api/library/courses",{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        return data.data
    })
    .catch(err=>console.log(err))

    return await response
}

export const getAllCourses = async ()=>{
    // returns all existing courses, response not paginated
    const response:Promise<Course[]> = fetch("http://127.0.0.1:8000/api/library/courses/retrieve_all",{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        return data.data
    })
    .catch(err=>console.log(err))

    return await response
}

export const getCourse = async (courseId:string|undefined) => {
      const response:Promise<Course> = fetch("http://127.0.0.1:8000/api/library/courses/"+courseId,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        return data
    })
    .catch(err=>console.log(err))

    return await response

}
