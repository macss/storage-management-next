import { firestore } from "@config/firebaseConfig"
import { doc, getDoc } from "@firebase/firestore"

const fetchDataAt = async (id: string, path: string) => {
  const docRef = doc(firestore, `/${path}/${id}`)

  try {
    const data = await getDoc(docRef)
    return {
      code: 'fetchDataAt/success',
      data: data.data()
    }
  } catch (error) {
    return {
      code: 'fetchDataAt/error',
      message: error
    }
  }
}

export default fetchDataAt