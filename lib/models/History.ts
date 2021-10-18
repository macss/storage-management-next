import Common from "./Common";

/**
 * The possible types of a history
 */
export enum HistoryTypes {
  /**
   * A `in` type of transaction
   */
  in = 'in',
  /**
   * A `out` type of transaction
   */
  out = 'out'
}

/**
 * History model
 */
interface History extends Common {
  /**
   * The quantity of the item being added or removed
   */
  amount: number
  /**
   * The compartment which the item is being added or removed
   */
  compartment_id: string
  /**
   * The item which is being added or removed
   */
  item_id: string
  /**
   * Wheter it is and `in` or `out` type of transaction
   */
  type: HistoryTypes
  /**
   * The id of the user making the changes
   */
  user_id: string
}

export default History