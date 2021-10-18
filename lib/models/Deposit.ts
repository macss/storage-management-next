import Common from "./Common";

/**
 * Deposit Model
 */
interface Deposit extends Common {
  /**
   * A code used to identify the deposit and it's location
   */
  code: string
  /**
   * A nickname to be used to the deposit
   */
  name: string
}

export default Deposit