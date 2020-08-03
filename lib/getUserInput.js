const inquirer = require("inquirer");

function getEmployeeDetailsAll() {
  let loop;
  let retVal = [];
  let questions = [
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
      type: "input", name: "name",
      message: "Employee Name:"
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
  /* {{{ **
  ** return inquirer.prompt(questions);
  ** }}} */
  function getOneEmployee() {
    console.log('∞° getOneEmployee.... retVal=\n"'+retVal+'"');
    inquirer.prompt(questions).then((answers) => {
      console.log('∞° answers=\n"'+answers+'"');
      retVal.push(answers)
      console.log('∞° added answers.... retVal=\n"'+retVal+'"');
      if (answers.addAnother) {
        getOneEmployee()
      }
      else {
        return retVal
      }
    }).catch(error => console.error(`Inquirer error: ${error.message}`));
  }
  return new Promise(resolve => resolve(getOneEmployee()));
  /* {{{ **
  ** const getOneEmployee = async () => return inquirer.prompt(questions);
  ** do {
  **   retVal.push(await getOneEmployee());
  **   loop = inquirer.prompt([
  **     {
  **       type: "confirm", name: "addAnother",
  **       message: "Add another employee?",
  **     }
  **   ]).then()
  ** }
  ** while (true);
  ** }}} */
}
module.exports = { getEmployeeDetailsAll }
