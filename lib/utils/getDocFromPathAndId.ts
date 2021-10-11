import { firestore } from "@config/firebaseConfig";
import { doc, DocumentSnapshot, getDoc } from "@firebase/firestore";
import { Database } from "@models";

const getDocFromPathAndId = async <P extends keyof Database>(path: P, id: string) => {
  const dataRef = doc(firestore, `/${path}/${id}`)
  const dataDoc = await getDoc(dataRef)

  return dataDoc as DocumentSnapshot<Database[P][string]>
}

export default getDocFromPathAndId