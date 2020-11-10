function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (arr) {
    return arr.map(record => createEmployeeRecord(record))
}

function createTimeInEvent (employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let timeIn = employeeRecord.timeInEvents.find(event => {
        return event.date === dateStamp
    })
    let timeOut = employeeRecord.timeOutEvents.find(event => {
        return event.date === dateStamp
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    let pay = parseInt(employeeRecord.payPerHour)
    return hoursWorkedOnDate(employeeRecord, dateStamp) * pay
}

function allWagesFor(employeeRecord) {
    let workedDates = employeeRecord.timeInEvents.map(event => event.date)
    const reducer = (acc, current) => acc + wagesEarnedOnDate(employeeRecord, current)
    let totalPay = workedDates.reduce(reducer, 0)
    return totalPay
}

function findEmployeeByFirstName(srcArray, firstName) {
    const person = srcArray.find(employee => employee.firstName === firstName)
    return person
}

function calculatePayroll(employeeRecords) {
    const reducer = (acc, current) => acc + allWagesFor(current)
    let payroll = employeeRecords.reduce(reducer, 0)
    return payroll
}