// Your code here
function createEmployeeRecord(element){
    let employee = []
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};
function createEmployeeRecords(employeeData) {
    return employeeData.map(function(element){
        return createEmployeeRecord(element)
    })
};
function createTimeInEvent(employeeData, time) {
    let [date, hour] = time.split(" ")
    employeeData.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employeeData
};
function createTimeOutEvent(employeeData, time) {
    let [date, hour] = time.split(" ")
    employeeData.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employeeData
};
function hoursWorkedOnDate(employee, dateQuest){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateQuest
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateQuest
    })
    return (outEvent.hour - inEvent.hour) / 100
};
function wagesEarnedOnDate(employee, dateQuest){
    let wage = hoursWorkedOnDate(employee, dateQuest) * employee.payPerHour
    return wage
};
let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
};
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(ric, rec){
        return ric + allWagesFor(rec)
    }, 0)
};
function findEmployeeByFirstName(employees, firstName){
    return employees.find(function(records){
        return records.firstName === firstName
    })
};
