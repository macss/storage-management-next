import Common from "./Common";

interface Compartment extends Common {
  active: boolean
  deposit_id: string
  histories?: Record<string, boolean>
  items?: Record<string, number>
  location: string
}

export default Compartment