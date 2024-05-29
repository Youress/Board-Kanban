import React, { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
  } from "@headlessui/react";

const AddTaskModal = ({onClose,tabName, addTask, loading}) => {
  const [text, setText] = useState('')
  return (
    <>
    <Transition appear show={true}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={onClose}
          
        >        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-[440px]  bg-[#383838] p-6 backdrop-blur-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h6 className="font-bold font-sans text-4xl">
                      Add Task
                    </h6>
                    <button onClick={onClose} className="text-4xl hover:bg-gray-600 h-16 w-16 flex items-center justify-center rounded-full">
                      x
                    </button>
                  </div>
                  <div className='flex items-center gap-4'>
                    <p className='font-bold'>Status:</p> <span className='bg-[rgb(119,121,128)] rounded-3xl px-3 text-xl'>{tabName}</span>
                  </div>
                  <div>
                    <div className="my-6">
                      <div className="mt-2">
                        <input
                        onChange={(e)=>setText(e.target.value)}
                          id="task"
                          name="task"
                          type="text"
                          placeholder="Task"
                          required
                          className="block w-full border-[1px] outline-none py-[16px] px-[14px] bg-transparent  border-white focus:border-purple-600 "
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button disabled={loading} onClick={()=>addTask(text)} className="w-full bg-[rgb(190,164,255)] px-9 py-4 text-2xl font-bold text-black hover:bg-[rgb(176,146,254)]">
                        Add Task
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AddTaskModal