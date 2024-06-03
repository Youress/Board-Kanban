import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { setBoard, addBoard, setToaster } from "../features/redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards } = useSelector((state) => state.userData);
  const {
    currentUser: { uid },
  } = getAuth();
  const boardColRef = collection(db, `users/${uid}/boards`);
  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      dispatch(
        addBoard({
          name,
          color,
          id: doc.id,
          createdAt: new Date().toLocaleDateString(),
        })
      );
    } catch (error) {
      dispatch(setToaster("Error Creating Board"));
      throw error;
    }
  };
  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
      }));
      dispatch(setBoard(boards));
    } catch (error) {
      dispatch(setToaster("Error updating Boards"));
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    } catch (error) {
      dispatch(setToaster("Error fetching Board"));
      throw error;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {
      dispatch(setToaster("Error updating Board"));
      throw error;
    }
  };

  const deleteBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boards/${boardId}`);

    try {
      //delete the doc from DB;
      await deleteDoc(docRef);
      // update the boards store;
      const tBoards = boards.filter((board) => board.id !== boardId);
      dispatch(setBoard(tBoards));
      navigate("/boards");
    } catch (error) {
      dispatch(setToaster("Error deleting the board"));
      throw error;
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData, deleteBoard };
};

export default useApp;
