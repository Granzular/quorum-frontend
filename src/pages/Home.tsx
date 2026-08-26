import { Link } from "react-router-dom"

function Home() {
  return (
    <>   
           <div className=" block text-white text-center h-dvh -mt-20 -mx-4 pt-10">
            <p className="leading-18 tracking-wider text-4xl text-gray-800 p-2 pb-10">Welcome To The <br></br><span className="text-5xl text-blue-600">Quorum</span><br></br><span className="text-2xl italic text-gray-700"> of Computer scientists</span></p>
            <div className="cta mt-30">
              <Link className="inline-block m-2 mr-4 text-xl text-gray-50 backdrop-blur-sm  rounded-2xl bg-blue-500 border hover:bg-blue-800 px-4 py-2" to={"/library"}>Library</Link>
            <Link className="inline-block m-2 ml-4 text-xl text-gray-800 backdrop-blur-sm  rounded-2xl border-blue-500 border hover:bg-blue-800 hover:text-white px-4 py-2" to={"/"}>Community</Link>
            </div>
           </div>
    </>
  )
}

export default Home