import BoardCard from "./BoardCard";
import BoardModal from "./BoardModal";
import NoBorad from "./NoBorad";
import TopBar from "./TopBar";
import useApp from "../../Hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BoardScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchBoard } = useApp();
  const {areBoardsFetched, boards} = useSelector(
    (state) => state.userData
  );
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!areBoardsFetched) fetchBoard(setLoading);
    else setLoading(false);
  }, []);

  if (loading) return <AppLoader />;
  return (
    <>
      <TopBar open={openModal} close={closeModal} isopen={isOpen} />
      <BoardModal open={openModal} close={closeModal} isopen={isOpen} />
      {/* <NoBorad/> */}
      <BoardCard boards={boards} />
    </>
  );
};

export default BoardScreen;
