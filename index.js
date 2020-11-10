// Your code here
function createEmployeeRecord(row) {
    return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

function createEmployeeRecords(rowData) {
return rowData.map(function(row) {
    return createEmployeeRecord(row)
})

}

function createTimeInEvent(employee, dateInfo) {
let [date, hour] = dateInfo.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateInfo) {
    let [date, hour] = dateInfo.split(" ")
    
        employee.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date: date
        })
        return employee
    }

function hoursWorkedOnDate(employee, specificDate) {
    let out = employee.timeOutEvents.find(function(e){
        return e.date === specificDate
    })

    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === specificDate
    })

    return (out.hour - inEvent.hour) / 100
    
}

function wagesEarnedOnDate(employee, specificDate) {
    return hoursWorkedOnDate(employee, specificDate) * employee.payPerHour
}

function allWagesFor(employee) {
let eligibleDates = employee.timeInEvents.map(function(e){
    return e.date
})
    let totalWage = eligibleDates.reduce(function(total, currentValue) {
        return total + wagesEarnedOnDate(employee, currentValue)
    }, 0)
    return totalWage
}

function calculatePayroll(employeeRecords) {
 return employeeRecords.reduce(function(memo, record){
     return memo + allWagesFor(record)
 },0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(empRec){
        return empRec.firstName === firstName
    })
}