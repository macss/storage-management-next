import Common from "./Common";

export const itemTypes = [
  'eletrônicos',
  'equipamentos',
  'peças',
  'outros'
] as const

interface Item extends Common {
  name: string,
  sap_code?: string
  supplier_code?: string
  type: typeof itemTypes[number]
  details?: string
}

export default Item