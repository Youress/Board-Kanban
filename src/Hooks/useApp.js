import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { setBoard,addBoard } from "../features/redux/UserSlice";
import {useDispatch} from "react-redux"

const useApp = () => {
  const dispatch = useDispatch()
  const {
    currentUser: { uid },
  } = getAuth();
  const boardColRef = collection(db, `users/${uid}/boards`);
  const createBoard = async ({ name, color }) => {
    try {
      await addDoc(boardColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      dispatch(addBoard({name,color,createdAt: new Date().toLocaleDateString()}))
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const fetchBoard = async (setLoading) => {
    try {
      const q = query(boardColRef, orderBy('createdAt',"desc"))
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt : doc.data().createdAt.toDate().toLocaleDateString()
      }));
      dispatch(setBoard(boards))
    } catch (error) {
      throw error;
    } finally {
      if(setLoading) setLoading(false)
    }
  };

  return { createBoard, fetchBoard };
};

export default useApp;
