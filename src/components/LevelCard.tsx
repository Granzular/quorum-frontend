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
   <div tabIndex={0} className='transition-colors duration-500 hover:border-blue-600 bg-gray-50 text-gray-700 shadow border border-gray-300 rounded-2xl p-3 h-90 overflow-y-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600'>
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
                <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                  {courses.map((c)=>
                  <li key={c.id} className='min-w-0 hover:bg-blue-600 rounded-2xl bg-blue-950 text-amber-50 text-center font-bold'><Link className="block w-full break-words rounded-2xl px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" to={`/library/course/${c.id}`}>{c.code}</Link></li>
                  )}                    
                </ul>
    </>
  )
}
