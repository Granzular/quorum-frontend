import {Outlet} from "react-router-dom"
import Header from "./Header"
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <>
    <Header/>
    <main >
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default MainLayout