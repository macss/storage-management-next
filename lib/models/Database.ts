import { Compartment, Deposit, History, Item, User } from "@models";

interface Database {
  compartments: Record<string, Compartment>
  deposits: Record<string, Deposit>
  histories: Record<string, History>
  items: Record<string, Item>
  users: Record<string, User>
}

export default Database