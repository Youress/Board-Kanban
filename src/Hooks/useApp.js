import {collection, addDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase'
import { getAuth } from 'firebase/auth'

const useApp = () => {
  const {currentUser:{uid}} = getAuth()
  const createBoard = async ({name,color}) => {
    const colRef = collection(db, `user/${uid}/boards`)
    try {
      await addDoc(colRef ,{
        name,
        color,
        createdAt : serverTimestamp()
      })
    } catch (error) {
      console.log(error)
      throw error
    }


  }


  return {createBoard}
}

export default useApp