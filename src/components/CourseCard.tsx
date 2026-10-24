import { Link } from "react-router-dom"
import type { Course } from "../models"

interface Props {
    course:Course
}

const CourseCard = ({course}:Props) => {
  return (
    <Link to={"/library/course/"+course.id} title="go to course" className='block min-w-0 cursor-pointer transition-colors duration-500 hover:bg-gray-800 hover:border-white hover:text-white hover:-translate-y-1 bg-gray-50 text-gray-700 shadow border border-gray-300 rounded-2xl p-3 h-48 overflow-y-auto break-words focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transform-none motion-reduce:transition-none'>
                <p className='text-blue-600 text-xl'>{course.code}</p>
                <p>title: {course.title}</p>
                <p>level: {course.level}</p>
                <p>semester: <b>{course.semester}</b></p>
                <p>credit unit: <b>{course.unit}</b></p>
             </Link>
  )
}

export default CourseCard
