import { firestore } from "@config/firebaseConfig"
import { collection, doc, setDoc } from "@firebase/firestore"
import { Database } from "@models"

export enum SetData {
  success,
  failure
}

const setData = async <P extends keyof Database, D extends Database[P][string]>(path: P, data: Omit<D, 'id' | 'created_at'>) => {
  
  const docCollection = collection(firestore, path)
  const docRef = doc(docCollection)

  try {
    await setDoc(docRef, {
      id: docRef.id,
      created_at: Date.now(),
      ...data
    }, { merge: true })
    return {
      code: SetData.success,
      redirectUrl: `/${path}/${docRef.id}`
    }
  } catch (error) {
    return {
      code: SetData.failure,
      redirectUrl: '',
      message: error
    }
  }  
}

export default setData