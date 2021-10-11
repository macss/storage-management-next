import { firestore } from "@config/firebaseConfig"
import { doc, getDoc, QueryDocumentSnapshot } from "@firebase/firestore"
import { Database } from "@models"

export enum FetchDataById {
  success = 'success',
  failure = 'failure'
}

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