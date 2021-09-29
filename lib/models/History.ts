import Common from "./Common";

interface History extends Common {
  amount: number
  compartment_id: string
  item_id: string
  type: 'in' | 'out'
  user_id: string
}

export default History