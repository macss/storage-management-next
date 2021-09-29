import Common from "./Common";

interface Deposit extends Common {
  code: string
  compartments?: Record<string, boolean>
  name: string
}

export default Deposit