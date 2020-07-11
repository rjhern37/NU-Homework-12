const inquirer = require("inquirer");

const db = require("./db");

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

async function viewAllEmployees(){
    const viewEmployee = await db.allEmployees();
    console.table(viewEmployee);
    prompts();
}

async function viewEmployeesByDepartment(){
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
    
    const employees = await db.allEmployeesByDepartment(departmentId);
    console.table(employees);
    prompts();

    // console.table(departments);

}

async function addEmployee(){

    const newEmployee = {
        
        first_name: null,
        last_name: null,
        role_id: null,

        manager_id: null
    }

    const {firstName} = await inquirer.prompt([
        {
            type: "input",
            message: "Please enter the employees first name",
            name: "firstName"

        }
    ])

    newEmployee.first_name = firstName;
   
    const {lastName} = await inquirer.prompt([
        {
            type: "input",
            message: "Please enter the employees last name",
            name: "lastName"

        }
    ])

    newEmployee.last_name = lastName;

    const roles =  await db.allRoles();

    const roleChoices = roles.map(({id, title}) => ({
        name: title,
        value: id
    }))

    
    const {roleId} = await inquirer.prompt([
        {
            type: "list",
            name: "roleId",
            message: "Set employee role",
            choices: roleChoices
        }
    ])

    newEmployee.role_id = roleId;

    const employees = await db.allEmployees();

    const employeeChoices = employees.map(e => {
        return {
            name: `${e.first_name} ${e.last_name}`,
            value: e.id
        }
    })

    const {managerId} = await inquirer.prompt([
        {
            type: "list",
            name: "managerId",
            message: "Select Manager",
            choices: employeeChoices
        }
    ])

    newEmployee.manager_id = managerId;
    
    const addEmployee = await db.addEmployee(newEmployee);

    prompts();

}

async function updateEmployeeRole(){




    const updateRole = await db.updateRole();

    prompts();
}

async function viewEmployeeRole(){



    prompts();

}

async function addDepartment(){

    const newDepartment = {
        department: null
    }

    const {newDepartmentName} = await inquirer.prompt([
        {
            type: "input",
            message: "Please enter a name for the department you would like to create",
            name: "newDepartmentName"

        }
    ])

    newDepartment.department = newDepartmentName;

    const addDepartment = await db.addDepartment(department);

}

async function addRole(){



    const role = await db.addRole();

}

async function quit(){
    

}