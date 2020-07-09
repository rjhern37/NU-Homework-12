const inquirer = require("inquirer");

const db = require("./db");
const { addDepartment } = require("./db");

require("console.table");

loadAll();

function loadAll(){
    prompts();
};

async function prompts(){
    const {choice} = await inquirer.prompt([

        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View employees by department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "Add employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update employee role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "View employee role",
                    value: "VIEW_EMPLOYEE_ROLE"
                },
                {
                    name: "Add department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                },
            ]
        }

    ])

    switch(choice){
        case "VIEW_EMPLOYEES":
            return viewAllEmployees()
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment()
        case "ADD_EMPLOYEE":
            return addEmployee()
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole()
        case "VIEW_EMPLOYEE_ROLE":
            return viewEmployeeRole()
        case "ADD_DEPARTMENT":
            return addDepartment()
        case "ADD_ROLE":
            return addRole()
        default:
            return quit()
    }

}

function viewAllEmployees(){
    const viewEmployee = await db.allEmployees();
    console.table(viewEmployee);
    prompts();
}

function viewEmployeesByDepartment(){
    const departments = await db.allDepartments();
    const departmentChoices = departments.map(({id, name}) => ({
        name: name,
        value: id
    }))
    const {departmentId} = await inquirer.prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: departmentChoices
        }
    ])
    
    const employees = await db.allEmployees();
    console.table(employees);

    // console.table(departments);

}

function addEmployee(){

}

function updateEmployeeRole(){

}

function viewEmployeeRole(){

}

function addDepartment(){

}

function addRole(){

}

function quit(){

}