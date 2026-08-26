import type { Course } from "./models";

interface CourseSchema {
    one: {
        first: Course[],
        second: Course[]
    },
    two: {
        first: Course[],
        second: Course[]
    },
    three: {
        first: Course[],
        second: Course[]
    },
    four: {
        first: Course[],
        second: Course[]
    },
    five: {
        first: Course[],
        second: Course[]
    }
}


export function parseCourseData(courses:Course[]):CourseSchema{

    const courseMap:CourseSchema = {
         one: {
        first: [],
        second: []
    },
    two: {
        first: [],
        second: []
    },
    three: {
        first: [],
        second: []
    },
    four: {
        first: [],
        second: []
    },
    five: {
        first: [],
        second: []
    }
    };
    
    courses.map((course)=>{
        if(course.level == "100"){
            if(course.semester === "first"){
                courseMap.one.first.push(course);
            }
            else{
                //second semester
                courseMap.one.second.push(course);
            }
        }
        else if(course.level == "200"){
            if(course.semester === "first"){
                courseMap.two.first.push(course);
            }
            else{
                //second semester
                courseMap.two.second.push(course);
            }
        }
        else if(course.level == "300"){
            if(course.semester === "first"){
                courseMap.three.first.push(course);
            }
            else{
                //second semester
                courseMap.three.second.push(course);
            }
        }
        else if(course.level == "400"){
            if(course.semester === "first"){
                courseMap.four.first.push(course);
            }
            else{
                //second semester
                courseMap.four.second.push(course);
            }
        }
        else if(course.level == "500"){
            if(course.semester === "first"){
                courseMap.five.first.push(course);
            }
            else{
                //second semester
                courseMap.five.second.push(course);
            }
        }
        else{
            console.log("course meta out of order")
        }

    })

    return courseMap
}