function createEmployeeRecord(input) {
    let employee = {
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
    return employee;
}

function createEmployeeRecords(array) {
    return array.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeObj, time) {
    let timeEvent = {
        type: "TimeIn", 
        date: time.slice(0, 10),
        hour: parseInt(time.slice(11, 15))
    }
    employeeObj.timeInEvents.push(timeEvent)
    return employeeObj;
}

function createTimeOutEvent(employeeObj, time) {
    let timeEvent = {
        type: "TimeOut", 
        date: time.slice(0, 10),
        hour: parseInt(time.slice(11, 15))
    }
    employeeObj.timeOutEvents.push(timeEvent)
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateString) {
    let timeInObj = employeeObj.timeInEvents.find(e => e.date == dateFromString(dateString));
    let timeOutObj = employeeObj.timeOutEvents.find(e => e.date == dateFromString(dateString));
    
    if (timeInObj && timeOutObj) {
        return (timeOutObj.hour - timeInObj.hour)/100
    } else {
        return "Employee did not work that day"
    }
}

function dateFromString(dateString) {
    return dateString.slice(0,10)
}

function wagesEarnedOnDate(employeeObj, dateString) {
    return hoursWorkedOnDate(employeeObj, dateString)*employeeObj.payPerHour
}

function allWagesFor(employeeObj) {
    return employeeObj.timeInEvents.reduce((accumulator, currentValue) => {
        return accumulator + wagesEarnedOnDate(employeeObj, currentValue.date);
    }, 0)
}

function calculatePayroll(array) {
    return array.reduce((accumulator, currentValue) => (accumulator + allWagesFor(currentValue)), 0)
}

function findEmployeeByFirstName(employees, employeeName){
    return employees.find(employee => {
        if (employee.firstName == employeeName || employee.lastName == employeeName) {
            return employee
        }
    })
}
