import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import CourseDetail from "./pages/CourseDetail";



export const router = createBrowserRouter(
    [
        {
        path: "/",
        element: <MainLayout/>,
        children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: "/library",
            children: [
                {
                    index: true,
                    element: <Library/>
                },
                {
                    path: "course/:id",
                    element: <CourseDetail/>
                }
            ]
        },
        {
            path: "*",
            element: <NotFound/>
        }
    ]
}
    ]

)