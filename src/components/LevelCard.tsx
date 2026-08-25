
interface Props {
    level: string
}

const LevelCard = ({level}:Props) => {
  return (
   <div tabIndex={1}  className='transition-colors duration-500 hover:border-2 hover:border-blue-600 bg-gray-50 shadow border border-gray-300 rounded-2xl p-3 h-90 overflow-y-scroll scrollbar-none'>
                <h3 className='text-blue-800 font-bold text-xl mb-3'>{level} Level</h3>
                <ul className='grid grid-cols-4'>
                  <li className='py-2 px-4 rounded-2xl bg-gray-950 text-amber-50 text-center font-bold m-3'>CSC 101</li>                  
                </ul>
              </div>
  )
}

export default LevelCard