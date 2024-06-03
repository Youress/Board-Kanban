import { useParams, useNavigate } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";
import BoardInterface from "./BoardInterface";
import BoardTopBar from "./BoardTopBar";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import useApp from "../../Hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import BoardNotReady from "./BoardNotReady";

const BoardScreen = () => {
  const { fetchBoard, deleteBoard } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [data, setData] = useState(null);
  const { boards, areBoardsFetched } = useSelector((state) => state.userData);
  const { BoardId } = useParams();
  const board = useMemo(
    () => boards.find((board) => board.id === BoardId),
    [boards, BoardId]
  );
  const dataBoard = useMemo(() => data, [data]);

  const handleChangeLastUpdate = useCallback(
    () => setLastUpdated(toDate().toLocaleDateString("en-us")),
    []
  );

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(BoardId);
      if (boardData) {
        const { lastUpdated, tabs } = boardData;
        setLastUpdated(lastUpdated.toDate().toLocaleString("en-us"));
        setData(tabs);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      setLoading(true)
      await deleteBoard(BoardId)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!areBoardsFetched || !board) navigate("/boards");
    else handleFetchBoard();
  }, []);
  if (!board) return null;
  if (loading) return <AppLoader />;
  if (!data) return <BoardNotReady />;

  return (
    <>
      <BoardTopBar {...board} lastupdated={lastUpdated} deleteBoard={handleDeleteBoard} />
      <BoardInterface
        dataBoard={dataBoard}
        boardId={BoardId}
        updateLastUpdated={handleChangeLastUpdate}
      />
    </>
  );
};

export default BoardScreen;
