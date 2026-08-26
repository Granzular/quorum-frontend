import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Course, Resource } from "../models";
import { getCourse } from "../api/Course";
import { getResource} from "../api/Resource";
import  NotAvailableCard from "../components/NotAvailableCard";
import MarkdownContent from "../components/MarkdownContent";

const CourseDetail = () => {
    const {id} = useParams();
    const [course,setCourse] = useState<Course>();
    const [resources,setResources] = useState<Resource[]>();

    useEffect(()=>{
        const f = async ()=>{
            const data = await getCourse(id)
            setCourse(data);
            const data2: Resource[] = []
            data?.resource.map(async (res)=>{
            data2.push(await getResource(res))
            setResources(data2);
        })
        
        }
        f();
    },
[id]);
    

  return (
    <div className="m-5 mx-8">
     
     <div className="mb-10 ">   
    <h2 className="uppercase font-bold text-xl text-gray-800">Course code: {course?.code}</h2>
    <p className="uppercase text-gray-800">Title: <b>{course?.title}</b></p>
    <p>UNIT: <b>{course?.unit}</b></p>
    <p className="text-gray-800 font-medium">{`${course?.level} level >`}<span className="text-gray-500">{` ${course?.semester} semester`}</span></p>
      </div>

    <h3 className="uppercase  text-xl  text-blue-400 font-medium">Synopsis</h3>
    <p className="p-2 pb-10">{course?.synopsis  == ""||course?.synopsis == null ?<NotAvailableCard message="Synopsis Not Available"/>:course?.synopsis}</p>
    
   <div className="grid lg:grid-cols-2 lg:gap-12 gap-y-12">
    
    <div className="lg:border border-gray-300 rounded pt-8 p-2 shadow-xl">
      <h3 className="uppercase text-xl text-blue-400 font-medium">Outline</h3>
    <div className="prose p-2 pb-10">{course?.outline == ""||course?.outline == null ?<NotAvailableCard message="Outline Not Available"/>:<MarkdownContent content={course?.outline}/>}</div>
    </div>
   <div className=" p-2 ">
     <h3 className="text-xl text-blue-500 mb-2 ">Resources</h3>
    <ul className="m-2">
      {resources?.map((res)=>
      <li>{res.name} <a className="mx-2 text-blue-400 underline" target="__blank" href={res.preview_url}>Preview</a></li>

      )}
    </ul>
   </div>
   </div>
    </div>
  )
}

export default CourseDetail