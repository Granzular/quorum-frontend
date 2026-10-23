import { Link } from "react-router-dom"
import { RippleBackground } from "../components/ui/custom-anim";

function Home() {
  return (
    <>   
           {/* Colored Hero Section */}
<div className="relative bg-gradient-to-b from-blue-700 to-blue-200 -mt-15 mb-20 md:-pt-20 pt-0 pb-24 w-screen text-white">
  <RippleBackground className="max-w-4xl mx-auto text-center">
                <p className="leading-18 text-4xl p-2 pb-10">
                  <br></br>
                <span className="text-7xl text-white font-extrabold">Quorum</span>
                <br></br>
                <span className="text-2xl italic text-gray-100"> of Computer scientists</span>
                </p>
  
  </RippleBackground>

  {/* SVG Wave Container snapped to the bottom margin */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
    <svg 
      className="relative block w-full h-[80px] md:h-[140px]" 
      viewBox="0 0 1440 120" 
      preserveAspectRatio="none" 
      xmlns="http://w3.org"
    >
      {/* 
        A true single 'm' shape using easily editable Quadratic Beziers (Q).
        It peaks at 360px, drops to a center valley at 720px, peaks again at 1080px.
      */}
      <path 
  className="fill-white" 
  d="M 0,120 C 360,-40 540,120 720,120 C 900,120 1080,-40 1440,120 Z"
></path>
    </svg>
  </div>

  <Link className="tracking-wider absolute -bottom-1/12 left-1/8 md:left-1/6 m-2 mr-4 text-xl font-medium  text-gray-50 backdrop-blur-sm  rounded-2xl bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 border hover:bg-none hover:bg-blue-800 px-4 py-2" to={"/library"}>Library</Link>
  <Link className="tracking-wider absolute -bottom-1/12 right-1/10 md:right-1/6 m-2 ml-4 text-xl font-medium text-white-500 bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 backdrop-blur-sm  rounded-2xl border-blue-200 border hover:bg-none hover:bg-blue-800 hover:text-white px-4 py-2" to={"/"}>Community</Link>
    {/* <BloodButton>&lt; cs/&gt;</BloodButton> */}

</div>     

           
      
           
    </>
  )
}

export default Home