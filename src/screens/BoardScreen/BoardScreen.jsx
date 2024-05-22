import BoardCard from "./BoardCard"
import BoardModal from "./BoardModal"
import NoBorad from "./NoBorad"
import TopBar from "./TopBar"
import { useState } from "react"

const BoardScreen = () => {
  let [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
<>
<TopBar open={openModal} close={closeModal} isopen={isOpen}/>
<BoardModal open={openModal} close={closeModal} isopen={isOpen}/>
{/* <NoBorad/> */}
<BoardCard/>
</>  )
}

export default BoardScreen