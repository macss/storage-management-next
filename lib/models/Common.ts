/**
 * The common attributes to one or more types of data of the DB
 */
interface Common {
  /**
   * Timestamp in millis of when the data was created
   */
  created_at: number
  /**
   * The database generated id of the data
   */
  id: string
}

export default Common