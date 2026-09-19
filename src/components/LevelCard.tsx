import { Link } from "react-router-dom"
import type { Course } from "../models"
import NotAvailableCard from "./NotAvailableCard"

interface Props {
    level: string,
    courses: {
      first:Course[],
      second:Course[]
    }
}

const LevelCard = ({level,courses}:Props) => {

  return (
   <div tabIndex={1}  className='transition-colors duration-500 hover:border-2 hover:border-blue-600 bg-gray-50 shadow border border-gray-300 rounded-2xl p-3 h-90 overflow-y-scroll scrollbar-none'>
                <h3 className='text-blue-800 font-bold text-xl mb-3'>{level} Level</h3>

               <SemesterCard courses={courses.first} semester="First Semester"/>
                <SemesterCard courses={courses.second} semester="Second Semester"/>

                


              </div>
  )
}

export default LevelCard

interface SemesterProps {
  courses: Course[],
  semester: string
}

const SemesterCard = ({courses,semester}:SemesterProps) => {
  if (courses.length == 0){
    return (
      <>
       <h4 className="text-gray-800">{semester}</h4>
       <NotAvailableCard message="Courses Not Available"/>
      </>
    )
  }
  return (
    <>
    <h4 className="text-gray-800 mb-2 font-medium">{semester}</h4>
                <ul className='grid md:grid-cols-5 grid-cols-3 gap-2'>
                  {courses.map((c)=>
                  <li className='hover:bg-blue-600 rounded-2xl bg-blue-950 text-amber-50 text-center font-bold m-3 p-0'><Link className="block w-full py-2 px-4 m-0 rounded-2xl" to={`/library/course/${c.id}`}>{c.code}</Link></li> 
                  )}                    
                </ul>
    </>
  )
}
