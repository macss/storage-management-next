import { firestore } from "@config/firebaseConfig"
import { collection, orderBy, query, limit, startAfter, Query, DocumentData, getDocs, QueryDocumentSnapshot, DocumentSnapshot } from "@firebase/firestore"
import { Database } from "@models"

export type Options<P extends keyof Database> = {
  limit?: number,
  startAt?: QueryDocumentSnapshot<Database[P][string]> | DocumentSnapshot<Database[P][string]>
}

export enum FetchDataAt {
  success = "success",
  failure = "failure"
}

const fetchDataAt = async <P extends keyof Database, D extends Database[P][string]>(path: P, options?: Options<P>) => {
  const dataRef = collection(firestore, path)
  let qry: Query<DocumentData>

  if (options?.startAt) {
    qry = query(dataRef, orderBy('created_at'), startAfter(options?.startAt), limit(options?.limit ?? 25))
  } else {
    qry = query(dataRef, orderBy('created_at'), limit(options?.limit ?? 25))
  }

  try {
    const response = await getDocs(qry)
    
    return {
      code: FetchDataAt.success,
      docs: response.docs as QueryDocumentSnapshot<D>[]
    }
  } catch (error) {
    return {
      code: FetchDataAt.failure,
      docs: []
    }
  }

}

export default fetchDataAt