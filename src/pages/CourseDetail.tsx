import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Link, useParams } from "react-router-dom"
import type { Course, Resource } from "../models";
import { getCourse } from "../api/course";
import { getResource} from "../api/resource";
import  NotAvailableCard from "../components/NotAvailableCard";
import MarkdownContent from "../components/MarkdownContent";

interface CourseDetailState {
    id: string | undefined;
    status: "loading" | "ready" | "error" | "not-found";
    course?: Course;
    resources: Resource[];
    resourceStatus: "loading" | "ready" | "error";
}

const CourseDetail = () => {
    const {id} = useParams();
    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState<CourseDetailState>({
        id,
        status: "loading",
        resources: [],
        resourceStatus: "loading",
    });

    useEffect(()=>{
        let active = true;

        async function loadCourse() {
            if (!id) return;

            let course: Course;
            try {
                course = await getCourse(id);
                if (!course || !Array.isArray(course.resource)) {
                    throw new Error("The course is unavailable.");
                }
            } catch (error) {
                if (active) {
                    setState({
                        id,
                        status: isAxiosError(error) && error.response?.status === 404 ? "not-found" : "error",
                        resources: [],
                        resourceStatus: "ready",
                    });
                }
                return;
            }

            if (!active) return;
            setState({ id, status: "ready", course, resources: [], resourceStatus: "loading" });

            const results = await Promise.allSettled(course.resource.map((resourceId) => getResource(resourceId)));
            if (!active) return;

            const resources: Resource[] = [];
            let hasResourceError = false;
            for (const result of results) {
                if (result.status === "fulfilled") resources.push(result.value);
                else hasResourceError = true;
            }

            setState({
                id,
                status: "ready",
                course,
                resources,
                resourceStatus: hasResourceError ? "error" : "ready",
            });
        }

        void loadCourse();
        return () => {
            active = false;
        };
    }, [id, attempt]);

    function retry() {
        setState({ id, status: "loading", resources: [], resourceStatus: "loading" });
        setAttempt((previous) => previous + 1);
    }

    if (state.id !== id || state.status === "loading") {
        return <p role="status" aria-live="polite" className="m-5 rounded-2xl border border-gray-300 p-6">Loading course…</p>;
    }

    if (state.status === "error" || state.status === "not-found") {
        return (
            <div role="alert" className="m-5 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-gray-800">
                <h2 className="mb-2 text-xl font-semibold">{state.status === "not-found" ? "Course not found" : "Course temporarily unavailable"}</h2>
                <p>{state.status === "not-found" ? "This course could not be found. Return to the Library to choose another course." : "We could not load this course. Please try again."}</p>
                {state.status === "error" && (
                    <button type="button" onClick={retry} className="mt-4 mr-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Try again</button>
                )}
                <Link to="/library" className="mt-4 inline-block rounded text-blue-700 underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Back to Library</Link>
            </div>
        );
    }

    const { course, resources, resourceStatus } = state;
    

  return (
    <div className="m-5 mx-8">
     
     <div className="mb-10 ">   
    <h2 className="uppercase font-bold text-xl text-gray-800">Course code: {course?.code}</h2>
    <p className="uppercase text-gray-800">Title: <b>{course?.title}</b></p>
    <p>UNIT: <b>{course?.unit}</b></p>
    <p className="text-gray-800 font-medium">{`${course?.level} level >`}<span className="text-gray-500">{` ${course?.semester} semester`}</span></p>
      </div>

    <h3 className="uppercase  text-xl  text-blue-400 font-medium">Synopsis</h3>
    <div className="p-2 pb-10">{course?.synopsis  == ""||course?.synopsis == null ?<NotAvailableCard message="Synopsis Not Available"/>:<p>{course.synopsis}</p>}</div>
    
   <div className="grid lg:grid-cols-2 lg:gap-12 gap-y-12">
    
    <div className="lg:border border-gray-300 rounded pt-8 p-2 shadow-xl">
      <h3 className="uppercase text-xl text-blue-400 font-medium">Outline</h3>
    <div className="prose p-2 pb-10">{course?.outline == ""||course?.outline == null ?<NotAvailableCard message="Outline Not Available"/>:<MarkdownContent content={course?.outline}/>}</div>
    </div>
   <div className=" p-2 ">
     <h3 className="text-xl text-blue-500 mb-2 ">Resources</h3>
    {resourceStatus === "loading" ? (
        <p role="status" aria-live="polite" className="m-2">Loading resources…</p>
    ) : (
        <>
            {resourceStatus === "error" && (
                <div role="alert" className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-gray-800">
                    <p>Some resources could not be loaded.</p>
                    <button type="button" onClick={retry} className="mt-2 rounded text-blue-700 underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Try again</button>
                </div>
            )}
            {resources.length > 0 ? (
                <ul className="m-2 space-y-3">
                    {resources.map((res) => (
                        <li key={res.id} className="break-words">
                            {res.name}
                            {res.preview_url ? (
                                <a className="mx-2 rounded text-blue-600 underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" target="_blank" rel="noopener noreferrer" href={res.preview_url}>Preview<span className="sr-only"> {res.name} (opens in a new tab)</span></a>
                            ) : (
                                <span className="ml-2 text-sm">Preview unavailable</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : resourceStatus === "ready" ? (
                <NotAvailableCard message="No resources are available for this course yet." />
            ) : null}
        </>
    )}
   </div>
   </div>
    </div>
  )
}

export default CourseDetail
