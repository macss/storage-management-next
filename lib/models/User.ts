import Common from "./Common";

/**
 * Possible User Roles
 */
export enum UserRoles {
  user = 'user',
  supervisor = 'supervisor',
  admin = 'admin'
}

/**
 * User model
 */
interface User extends Common {
  /**
   * User e-mail
   */
  email: string
  /**
   * User fullname
   */
  fullname: string
  /**
   * User register 200XXXX
   */
  register: number
  /**
   * User role
   */
  role: UserRoles
}

export default User