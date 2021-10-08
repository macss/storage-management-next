import { firestore } from "@config/firebaseConfig"
import { doc, getDoc } from "@firebase/firestore"
import { Database } from "@models"

export enum FetchDataById {
  success,
  failure
}

const fetchDataById = async <P extends keyof Database>(id: string, path: P) => {
  const docRef = doc(firestore, `/${path}/${id}`)
  
  try {
    const data = await getDoc(docRef)
    return {
      code: FetchDataById.success,
      data: data.data() as Database[P][string]
    }
  } catch (error) {
    return {
      code: FetchDataById.failure,
      message: error
    }
  }
}

export default fetchDataById