import React from 'react'

const BoardCard = () => {
  return (
    <div className="mt-16 px-7">
  <div className="flex flex-wrap sm:-ml-12 -ml-6">
    <div className=" max-w-[25%] basis-1/4 grow-0 sm:pl-12 pl-6 pt-6 sm-pt-12">
<div className="flex flex-col p-6 bg-[rgba(18,18,18)] border-l-4  border-orange-400 gap-3">
<div className="flex items-center justify-between">
  <div className='w-1/2'>
    <h6 className="font-bold text-3xl overflow-hidden  text-ellipsis whitespace-nowrap ">Ahmed aliaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h6>
  </div>
  <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>
</button>
</div>
<span>Created at: 5/22/2024, 2:08:16 PM</span>
</div>
    </div>

  </div>

</div>
  )
}

export default BoardCard