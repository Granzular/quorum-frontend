import type { Course } from "../models"

interface Props {
    key:string,
    course:Course
}

const CourseCard = ({course}:Props) => {
  return (
    <div tabIndex={1}  className='transition-colors duration-500 hover:bg-gray-800 hover:border-white hover:text-white hover:-translate-y-1 bg-gray-50 shadow border border-gray-300 rounded-2xl p-3 h-48 overflow-y-scroll scrollbar-none'>
                <p className='text-blue-600 text-xl'>{course.code}</p>
                <p>title: {course.title}</p>
                <p>level: {course.level}</p>
                <p>semester: <b>{course.semester}</b></p>
                <p>credit unit: <b>{course.unit}</b></p>
             </div>
  )
}

export default CourseCard