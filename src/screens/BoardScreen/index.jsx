import AddTaskModal from "./AddTaskModal";
import BoardInterface from "./BoardInterface";
import BoardTopBar from "./BoardTopBar";
import { useState } from "react";

const BoardScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return <>
  <BoardTopBar/>
  <BoardInterface open={openModal}/>
  <AddTaskModal open={openModal} close={closeModal} isopen={isOpen}/>
  </>;
};

export default BoardScreen;
