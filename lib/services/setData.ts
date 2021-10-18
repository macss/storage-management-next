import { firestore } from "@config/firebaseConfig"
import { collection, doc, setDoc } from "@firebase/firestore"
import { Common, Database } from "@models"

/**
 * The possible codes that the function can return
 */
export enum SetData {
  success = 'success',
  failure = 'failure'
}

/**
 * Function used either to create a new entrie in the DB or to update an existing one
 * 
 * @param path Where to put the current data
 * @param data The data you want to create or update
 * @returns Promise to resolve wheter it was successful or not
 */
const setData = async <P extends keyof Database, D extends Database[P][string]>(path: P, data: Omit<D, keyof Common> & Partial<Common>) => {
  
  const docCollection = collection(firestore, path)
  const docRef = data.id ? doc(docCollection, data.id) : doc(docCollection)

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