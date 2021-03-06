const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }
    allEmployees(){
        return this.connection.query(
            "SELECT * FROM employee"
        )
    }

    allDepartments(){
        return this.connection.query(
            "SELECT * FROM department"
        )

    }
    allEmployeesByDepartment(departmentId){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;", departmentId
        )

    }

    allRoles(){
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary from role LEFT JOIN department on role.department_id= department.id"
        )
    }

    addEmployee(employee){
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        )
    }

    addRole(role){
        return this.connection.query(
            "INSERT INTO role SET ?", role
        )
    }

    addDepartment(department){
        return this.connection.query(
            "INSERT INTO department SET ?", department
        )
    }

    updateRole(employeeId, roleId){
        return this.connection.query(
            "UPDATE employee SET role_id= ? WHERE id= ?", [roleId, employeeId]
        )
    }

}

module.exports = new DB(connection);