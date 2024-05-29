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
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { setBoard, addBoard } from "../features/redux/UserSlice";
import { useDispatch } from "react-redux";

const useApp = () => {
  const dispatch = useDispatch();
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
      console.log(error);
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
      throw error;
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
      throw error;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {
      console.log(error);
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData };
};

export default useApp;
