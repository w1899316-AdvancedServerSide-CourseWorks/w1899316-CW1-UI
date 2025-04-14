export class UserDTO {
    constructor({ userId, firstName, lastName, email, role, created_at }) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.role = role;
      this.created_at = created_at;
    }
  }
  