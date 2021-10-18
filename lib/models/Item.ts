import Common from "./Common";

/**
 * Possible item types
 */
export enum ItemTypes {
  eletronicos = 'eletrônicos',
  equipamentos = 'equipamentos',
  pecas = 'peças',
  outros = 'outros'
}

/**
 * Item Model
 */
interface Item extends Common {
  /**
   * The name of the item
   */
  name: string,
  /**
   * The SAP code of the item
   */
  sap_code?: string
  /**
   * The supplier code of the item
   */
  supplier_code?: string
  /**
   * The type of item
   */
  type: ItemTypes
  /**
   * Additional description of the item
   */
  details?: string
}

export default Item