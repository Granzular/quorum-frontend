import {Outlet} from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <>
    <Header/>
    <main className="p-4">
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default MainLayout