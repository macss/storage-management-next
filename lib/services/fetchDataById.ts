import { firestore } from "@config/firebaseConfig"
import { doc, getDoc, QueryDocumentSnapshot } from "@firebase/firestore"
import { Database } from "@models"

/**
 * Possible codes that the function can return
 */
export enum FetchDataById {
  success = 'success',
  failure = 'failure'
}

/**
 * Function to fetch specific data from the `DB` using the provided `id`
 * 
 * @param id ID of the data you want to fetch
 * @param path DB location of the data
 * @returns Promise to resolve with the data
 */
const fetchDataById = async <P extends keyof Database>(id: string, path: P) => {
  const docRef = doc(firestore, `/${path}/${id}`)
  
  try {
    const data = await getDoc(docRef)
    return {
      code: FetchDataById.success,
      doc: data as QueryDocumentSnapshot<Database[P][string]>
    }
  } catch (error) {
    return {
      code: FetchDataById.failure,
      message: error
    }
  }
}

export default fetchDataById