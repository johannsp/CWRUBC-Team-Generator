// TODO: Write code to define and export the Employee class

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = "Employee";
  }
  getName() {
    // return copy of string created by method
    return this.name.repeat(1);
  }
  getId() {
    return this.id;
  }
  getEmail() {
    // return copy of string created by method
    return this.email.repeat(1);
  }
  getRole() {
    // return copy of string created by method
    return this.role.repeat(1);
  }
}

module.exports = Employee;
