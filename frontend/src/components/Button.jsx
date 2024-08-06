import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const button = ({text,path}) => {
  // const navigate=useNavigate();
  
  return (
    <div className=' m-auto w-48'>
    
      <Link to={`/${path}`}>
      <button  className=' bg-medium text-white p-4 font-semibold text-2xl  rounded-md whitespace-nowrap  shadow-[0px_4px_0px_0px] shadow-secondary  '> {text}</button>
      </Link>

      {/* onClick={()=>navigate("/promptquiz")}  */}
        
    </div>
  )
}

export default button