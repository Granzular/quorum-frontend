import { api } from "./client";

export const getCourses = async ()=>{
    // paginaated response
    const response = await api.get("library/courses");
    return response.data.data;
}
   
export const getAllCourses = async ()=>{
    // returns all existing courses, response not paginated
    const response = await api.get("library/courses/retrieve_all")
    return response.data.data;
}

export const getCourse = async (courseId:string|undefined) => {
      const response = await api.get(`library/courses/${courseId}`)
      return response.data.data;
}