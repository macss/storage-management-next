import Common from "./Common";

/**
 * Compartment Model
 */
interface Compartment extends Common {
  /**
   * Wheter or not the compartment is active in its deposit
   */
  active: boolean
  /**
   * The database id of the deposit holding the current compartment
   */
  deposit_id: string
  /**
   * The items that might be stored in the current compartment
   */
  items?: Record<string, number>
  /**
   * The location of the current compartment, could be a code to ease the finding of the compartment in real life
   */
  location: string
}

export default Compartment