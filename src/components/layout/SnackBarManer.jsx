import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToaster } from '../../features/redux/UserSlice'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


const SnackBarManer = () => {
    const dispatch = useDispatch()
    const {toastrMsg} = useSelector(state=>state.userData)
    setTimeout(()=>{
        dispatch(setToaster(""))
    },3000)
  return (
    <Dialog className="fixed top-12 right-auto left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" open={!!toastrMsg} onClose={() => dispatch(setToaster(""))}>
      <DialogPanel className="min-w-[28rem] bg-white px-7 py-3 ">
        <DialogTitle className="text-black font-bold font-sans capitalize ">{toastrMsg}</DialogTitle>
      </DialogPanel>
    </Dialog>
  )
}

export default SnackBarManer