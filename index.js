function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map( emp => createEmployeeRecord(emp))
}

function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0] 
    })
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date).hour;
    let timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
    let hoursWorked = timeOut - timeIn;
    hoursWorked = hoursWorked.toString();
    let time = hoursWorked.slice(0, -2);
    return parseInt(time);
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return hours * parseInt(employee.payPerHour)
}

function allWagesFor(employee) {
    const reducer = (accumulator, date) => accumulator + wagesEarnedOnDate(employee, date.date);
    return employee.timeInEvents.reduce(reducer, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find( employee => employee.firstName === firstName)
}

function calculatePayroll(array) {
    const reducer = (total, employee) => total + allWagesFor(employee)
    return array.reduce(reducer, 0)
}