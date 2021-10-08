import { firestore } from "@config/firebaseConfig"
import { collection, orderBy, query, limit, startAfter, Query, DocumentData, getDocs } from "@firebase/firestore"
import { Database } from "@models"

type Options<P extends keyof Database> = {
  limit?: number,
  startAt?: Database[P][string]
}

export enum FetchDataAt {
  success,
  failure
}

const fetchDataAt = async <P extends keyof Database, D extends Database[P][string]>(path: P, options?: Options<P>) => {
  const dataRef = collection(firestore, path)
  let qry: Query<DocumentData>

  if (options?.startAt) {
    qry = query(dataRef, orderBy('created_at'), limit(options?.limit ?? 25), startAfter(options?.startAt))
  } else {
    qry = query(dataRef, orderBy('created_at'), limit(options?.limit ?? 25))
  }

  try {
    const data = await getDocs(qry)
    return {
      code: FetchDataAt.success,
      data: data.docs.map(doc => doc.data() as D)
    }
  } catch (error) {
    return {
      code: FetchDataAt.failure,

    }
  }

}

export default fetchDataAt