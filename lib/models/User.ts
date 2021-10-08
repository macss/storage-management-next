import Common from "./Common";

export enum UserRoles {
  user,
  supervisor,
  admin
}

interface User extends Common {
  email: string
  fullname: string
  register: number
  role: UserRoles
}

export default User