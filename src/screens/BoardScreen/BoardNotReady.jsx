import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardNotReady = () => {
    const navigate = useNavigate()
  return (
    <div className="text-center mt-40 flex flex-col gap-4">
  <h5 className="font-bold font-sans text-4xl">Seems like your board is not ready
</h5>
  <p>Sometime it may take a few seconds for the board to be ready for use.
Try again in a few seconds</p>
<div>
    <button onClick={()=>navigate('/boards')} className='bg-[rgb(190,164,255)] text-black w-fit p-2'>Go Back!</button>
</div>
</div>
  )
}

export default BoardNotReady