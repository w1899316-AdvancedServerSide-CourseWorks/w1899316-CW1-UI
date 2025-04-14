export class UserDTO {
    constructor({ userId, firstName, lastName, email, role, createdAt }) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
    }
  }
  