import { firestore } from "@config/firebaseConfig";
import { doc, DocumentSnapshot, getDoc } from "@firebase/firestore";
import { Database } from "@models";

/**
 * Returns a Firestore Document given the path and id
 * 
 * @param path The path to fetch the doc
 * @param id The id of the data
 * @returns DocumentSnapshot
 */
const getDocFromPathAndId = async <P extends keyof Database>(path: P, id: string) => {
  const dataRef = doc(firestore, `/${path}/${id}`)
  const dataDoc = await getDoc(dataRef)

  return dataDoc as DocumentSnapshot<Database[P][string]>
}

export default getDocFromPathAndId