import Common from "./Common";

interface Compartment extends Common {
  active: boolean
  deposit_id: string
  items?: Record<string, number>
  location: string
}

export default Compartment