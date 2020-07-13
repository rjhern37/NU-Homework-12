const inquirer = require("inquirer");

const db = require("./db");
const connection = require("./db/connection");

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
                    name: "View all departments",
                    value: "VIEW_DEPARTMENTS"
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
                    name: "View roles",
                    value: "VIEW_ROLES"
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
        case "VIEW_DEPARTMENTS":
            return viewDepartments()
        case "ADD_EMPLOYEE":
            return addEmployee()
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole()
        case "VIEW_ROLES":
            return viewRoles()
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

async function viewDepartments(){
    const departments = await db.allDepartments();
    
    console.table(departments);
    prompts();

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

    const employees = await db.allEmployees();

    const employeeChoices = employees.map(e => {
        return {
            name: `${e.first_name} ${e.last_name}`,
            value: e.id
        }
    })

    const {employeeId} = await inquirer.prompt([

        {
            message: "Which employees role would you like to update?",
            type: "list",
            name: "employeeId",
            choices: employeeChoices
        }

    ])

    const roles = await db.allRoles();

    const roleChoices = roles.map(e => {
        return {
            name: e.title,
            value: e.id
        }
    })

    const {roleId} = await inquirer.prompt([

        {
            message: "Which role do you want to assign the selected employee?",
            type: "list",
            name: "roleId",
            choices: roleChoices
        }

    ])

    await db.updateRole(employeeId, roleId);
    console.log("Updating Role...One moment...");

    setTimeout(function(){prompts()}, 750);

}

async function viewRoles(){

    const roles = await db.allRoles();
    
    console.table(roles);
    prompts();

}

async function addDepartment(){

    const newDepartment = {
        name: null
    }

    const {departmentName} = await inquirer.prompt([
        {
            type: "input",
            message: "Please enter a name for the department you would like to create",
            name: "departmentName"

        }
    ])

    newDepartment.name = departmentName;

    const addNewDeparment = await db.addDepartment(newDepartment);
    console.log("Adding Department...One moment...");

    setTimeout(function(){prompts()}, 750);

}

async function addRole(){

    const newRole = {

        title: null,
        salary: null,
        department_id: null

    }

    const {title} = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the Role would you like to add?",
        }
    ])

    newRole.title = title;

    const {salary} = await inquirer.prompt([
        {
            type: "input",
            name: "salary",
            message: "Please enter the salary for the role",
        }
    ])

    newRole.salary = salary;


    const departments = await db.allDepartments();
    const departmentChoices = departments.map(({id, name}) => ({
        name: name,
        value: id
    }))

    const {departmentId} = await inquirer.prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department does this role belong to?",
            choices: departmentChoices
        }
    ])

    newRole.department_id = departmentId;

    const createdRole = await db.addRole(newRole);

    console.log("Adding Role...One moment...");

    setTimeout(function(){prompts()}, 750);

}

async function quit(){

    const {quit} = await inquirer.prompt([
        {
            type: "confirm",
            name: "quit",
            message: "Do you want to quit the application?",
        },

        
    ])
    if(quit){
        process.exit();
    } else {
        prompts();
    }
}