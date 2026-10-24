import { api } from "./client";
import type { Course } from "../models";

export const getCourses = async ()=>{
    // paginaated response
    const response = await api.get("library/courses");
    return response.data.data;
}
   
export const getAllCourses = async (): Promise<Course[]> =>{
    // returns all existing courses, response not paginated
    const response = await api.get("library/courses/retrieve_all")
    return response.data.data;
}

export const getCourse = async (courseId:string): Promise<Course> => {
      const response = await api.get(`library/courses/${courseId}`)
      return response.data.data;
}
