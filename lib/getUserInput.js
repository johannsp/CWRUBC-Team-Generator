const inquirer = require("inquirer");

const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

let retVal = [];

const questions = [
  {
    type: "input", name: "name",
    message: "Employee Name:"
  },
  {
    type: "expand", name: "role",
    message: "Employee Role Engineer/Intern/Manager:",
    choices: [
      { 
        key: "e", name: "Engineer", value: "Engineer" 
      },
      { 
        key: "i", name: "Intern", value: "Intern"
      },
      { 
        key: "m", name: "Manager", value: "Manager"
      }
    ],
  },
  {
    type: "input", name: "id",
    message: "Employee ID number:",
    validate: (val) => {
      let pass = val.match(
        /^\d+$/
      );
      return (pass)
        ? true
        : "Need a number value for ID number";
    }
  },
  {
    type: "input", name: "email",
    message: "Employee Email:",
    validate: (val) => {
      let pass = val.match(
        /^\w+@\w+\.\w+/
      );
      return (pass)
        ? true
        : "Need email address to match pattern 'name@site.dom'";
    }
  },
  {
    type: "input", name: "github",
    message: "Engineer GitHub account:",
    validate: (val) => {
      let pass = val.match(
        /^(?:http:\/\/)?github\.com\/\w+/
      );
      return (pass)
        ? true
        : "Need github to match pattern 'github.com/account-name'";
    },
    when: (answers) => (answers.role === "Engineer")
  },
  {
    type: "input", name: "school",
    message: "Intern school:",
    when: (answers) => (answers.role === "Intern")
  },
  {
    type: "input", name: "officeNumber",
    message: "Manager office number:",
    validate: (val) => {
      let pass = val.match(
        /^\d+$/
      );
      return (pass)
        ? true
        : "Need a number value for ID number";
    },
    when: (answers) => (answers.role === "Manager")
  },
  {
    type: "confirm", name: "addAnother",
    message: "Add another employee",
  }
];

async function getEmployeeDetailsAll() {
  return new Promise(async (resolve, reject) => {
    let inp = await inquirer.prompt(questions);
    let person;
    switch (inp.role) {
      case "Engineer":
        person = new Engineer(inp.name, inp.id, inp.email, inp.github);
        break;
      case "Intern":
        person = new Intern(inp.name, inp.id, inp.email, inp.school);
        break;
      case "Manager":
        person = new Manager(inp.name, inp.id, inp.email, inp.officeNumber);
        break;
      default:
        reject(`Unsupported role ${inp.role}`);
        person = new Employee(inp.name, inp.id, inp.email);
        break;
    }
    retVal.push(person)
    if (inp.addAnother) {
      await getEmployeeDetailsAll()
    }
    resolve(retVal.slice(0));
  });
}
module.exports.getEmployeeDetailsAll = getEmployeeDetailsAll;
