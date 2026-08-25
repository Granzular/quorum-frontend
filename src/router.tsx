import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";



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
            element: <Library/>
        },
        {
            path: "*",
            element: <NotFound/>
        }
    ]
}
    ]

)