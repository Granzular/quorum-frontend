import { useEffect, useMemo, useState } from 'react'
import { getAllCourses } from '../api/course'
import type { Course} from '../models'
import SearchForm from '../components/SearchForm';
import CourseCard from '../components/CourseCard';
import LevelCard from '../components/LevelCard';
import { parseCourseData } from '../utils';

function Library() {
     const [courses,setCourses] = useState<Course[]>([]);
     const [fc,setFc] = useState<Course[]>([...courses]);

     
      useEffect(()=>{
        const f = async ()=>{
          const data:Course[] = await getAllCourses();
          setCourses(data);
        
        }
        f();
      },[]);

     const coursesmap =  useMemo(()=>{
          return parseCourseData(courses);
      },[courses]);
    

      const handleSearch = (q:string,p:string|undefined)=>{
        
        const tokens = q.split(" ").filter((x)=>x.trim() !="");
        let token:string;
        const _cs:Course[] = [];

       
          courses.map((c)=>{
            for(token of tokens){

              if(c.code.toLowerCase().search(token.toLowerCase()) !== -1 ){
                if(p !==undefined && p.trim() !==""){
                  if(c.level == p){
                     _cs.push(c);
                  }
                }
                else{
                  _cs.push(c);}   
              }

            }

            setCourses([...courses])
            setFc([..._cs])
          })
          
        
          }

  return (
   <>
   <h2 className='mb-5 text-3xl text-black'>Library</h2>
   <section className='rounded border border-gray-300 min-h-50 mb-30'>
           <div className='rounded flex flex-row border border-gray-300 px-6 py-3 bg-gray-100 backdrop-blur'>
            <h2 className='w-1/2 text-xl text-gray-900 font-light'>Course Quick Search</h2>
            <SearchForm placeholder='search course' action={handleSearch} filterParams={["100","200","300","400","500"]}/>
            </div>
            
           <div className='max-h-110 overflow-y-scroll scrollbar-thin grid  sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2 m-5 '>
             {fc.length !== 0 ?
              fc.map((course)=>(
                <CourseCard key={course.id} course={course}/>
             )):<div>No Courses Available for the query.</div>}
           </div>
         </section>

         <section>
           <div className='rounded flex flex-row border border-gray-300 px-6 py-3 bg-gray-100 backdrop-blur mb-3'>
            <h2 className='w-1/2 text-xl text-gray-900 font-light'>Courses By Level</h2>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 grid-rows-3 gap-x-5 gap-y-10'>
              <LevelCard courses={coursesmap.one} level="100"/>
              <LevelCard courses={coursesmap.two} level="200"/>
              <LevelCard courses={coursesmap.three} level='300'/>
              <LevelCard courses={coursesmap.four} level='400'/>
              <LevelCard courses={coursesmap.five} level='500'/>
            </div>
         </section>

   </>
  )
}

export default Library