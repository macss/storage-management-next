import { firestore } from "@config/firebaseConfig"
import { collection, orderBy, query, limit, startAfter, Query, DocumentData, getDocs, QueryDocumentSnapshot, DocumentSnapshot } from "@firebase/firestore"
import { Database } from "@models"

export type Options<P extends keyof Database> = {
  /**
   * How many items to fetch at max
   */
  limit?: number,
  /**
   * A Document Snapshot of the last item fetched
   */
  startAt?: QueryDocumentSnapshot<Database[P][string]> | DocumentSnapshot<Database[P][string]>,
  /**
   * The order in which the data is fetched
   */
  orderBy?: keyof Database[P][string]
}

/**
 * Possible codes that the function can return
 */
export enum FetchDataAt {
  success = "success",
  failure = "failure"
}

/**
 * Function used to fetch data at an specific `PATH` of the `DB`, fetch data in batches
 * 
 * @param path The path in which to fetch, it is used to determine the type of data that is fetched
 * @param options Fetching options
 * 
 * @returns {Object} {
 *  code: FetchDataAt code,
 *  docs: Array of documents
 * }
 */
const fetchDataAt = async <P extends keyof Database, D extends Database[P][string]>(path: P, options?: Options<P>) => {
  const dataRef = collection(firestore, path)
  let qry: Query<DocumentData>

  if (options?.startAt) {
    qry = query(dataRef, orderBy(options?.orderBy as string ?? 'created_at'), startAfter(options?.startAt), limit(options?.limit ?? 25))
  } else {
    qry = query(dataRef, orderBy(options?.orderBy as string ?? 'created_at'), limit(options?.limit ?? 25))
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