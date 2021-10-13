import Common from "./Common";

export enum HistoryTypes {
  in = 'in',
  out = 'out'
}

interface History extends Common {
  amount: number
  compartment_id: string
  item_id: string
  type: HistoryTypes
  user_id: string
}

export default History