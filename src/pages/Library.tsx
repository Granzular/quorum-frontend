import { useMemo, useState } from "react";
import SearchForm from "../components/SearchForm";
import CourseCard from "../components/CourseCard";
import LevelCard from "../components/LevelCard";
import NotAvailableCard from "../components/NotAvailableCard";
import { useCourses } from "../hooks/useCourses";
import { filterCourses, parseCourseData } from "../utils";

function Library() {
  const { courses, status, retry } = useCourses();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const coursesmap = useMemo(() => parseCourseData(courses), [courses]);
  const filteredCourses = useMemo(() => filterCourses(courses, query, level), [courses, query, level]);

  function handleSearch(nextQuery: string, nextLevel?: string) {
    setQuery(nextQuery);
    setLevel(nextLevel ?? "");
  }

  return (
    <div className="p-4">
      <h2 className="mb-5 text-3xl text-(--text-h)">Library</h2>
      {status === "loading" ? (
        <p role="status" aria-live="polite" className="rounded-2xl border border-gray-300 p-6">Loading courses…</p>
      ) : status === "error" ? (
        <div role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-gray-800">
          <p>The Library is temporarily unavailable. Try loading the course list again.</p>
          <button type="button" onClick={retry} className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
            Try again
          </button>
        </div>
      ) : courses.length === 0 ? (
        <NotAvailableCard message="No courses are available in the Library yet." />
      ) : (
        <>
          <section className="mb-30 min-h-50 rounded border border-gray-300" aria-labelledby="course-search-heading">
            <div className="flex flex-col gap-2 rounded border border-gray-300 bg-gray-100 px-6 py-3 backdrop-blur md:flex-row md:items-center">
              <h2 id="course-search-heading" className="text-xl font-light text-gray-900 md:w-1/2">Course Quick Search</h2>
              <SearchForm
                className="md:ml-auto"
                placeholder="Search course code or title"
                action={handleSearch}
                filterParams={["100", "200", "300", "400", "500"]}
              />
            </div>
            <div aria-live="polite" className="m-5 grid max-h-110 gap-2 overflow-y-auto p-2 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
              ) : (
                <p className="col-span-full p-3">No courses match your search and level filter.</p>
              )}
            </div>
          </section>

          <section aria-labelledby="courses-by-level-heading">
            <div className="mb-3 flex flex-row rounded border border-gray-300 bg-gray-100 px-6 py-3 backdrop-blur">
              <h2 id="courses-by-level-heading" className="text-xl font-light text-gray-900">Courses By Level</h2>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-2">
              <LevelCard courses={coursesmap.one} level="100" />
              <LevelCard courses={coursesmap.two} level="200" />
              <LevelCard courses={coursesmap.three} level="300" />
              <LevelCard courses={coursesmap.four} level="400" />
              <LevelCard courses={coursesmap.five} level="500" />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Library;
