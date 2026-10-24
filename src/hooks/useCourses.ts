import { useEffect, useState } from "react";
import { getAllCourses } from "../api/course";
import type { Course } from "../models";

interface CoursesState {
  courses: Course[];
  status: "loading" | "ready" | "error";
}

// Shared by the Library and its landing-page preview, using the existing endpoint.
export function useCourses() {
  const [state, setState] = useState<CoursesState>({
    courses: [],
    status: "loading",
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadCourses() {
      try {
        const courses = await getAllCourses();

        if (!Array.isArray(courses)) {
          throw new Error("The course list is unavailable.");
        }

        if (active) setState({ courses, status: "ready" });
      } catch {
        if (active) setState({ courses: [], status: "error" });
      }
    }

    void loadCourses();
    return () => {
      active = false;
    };
  }, [attempt]);

  function retry() {
    setState({ courses: [], status: "loading" });
    setAttempt((previous) => previous + 1);
  }

  return { ...state, retry };
}
