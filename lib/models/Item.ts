import Common from "./Common";

export enum ItemTypes {
  eletronicos = 'eletrônicos',
  equipamentos = 'equipamentos',
  pecas = 'peças',
  outros = 'outros'
}

interface Item extends Common {
  name: string,
  sap_code?: string
  supplier_code?: string
  type: ItemTypes
  details?: string
}

export default Item