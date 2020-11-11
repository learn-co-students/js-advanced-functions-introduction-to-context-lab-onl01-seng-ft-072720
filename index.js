// Your code here
function createEmployeeRecord(employees) {
    return {
    firstName: employees[0],
    familyName: employees[1],
    title: employees[2],
    payPerHour: employees[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employee, time) {
    let timeEntry = {
        type: "TimeIn",
        date: time.slice(0, 10),
        hour: parseInt(time.slice(-4))
    }
    employee.timeInEvents.push(timeEntry)
    return employee
}

function createTimeOutEvent(employee, time) {
    let timeOutEntry = {
        type: "TimeOut",
        date: time.slice(0,10),
        hour: parseInt(time.slice(-4))
    }
    employee.timeOutEvents.push(timeOutEntry)
    return employee
}

function hoursWorkedOnDate(employee, time) {
    const timeIn = employee.timeInEvents.find(event => event.date === time);
    const timeOut = employee.timeOutEvents.find(event => event.date === time);
    return (timeOut.hour - timeIn.hour)/100;
  }

  function wagesEarnedOnDate(employee, time) {
    return hoursWorkedOnDate(employee, time) * employee.payPerHour
  }

  function allWagesFor(employee) {
    const allWages = employee.timeInEvents.map(event => wagesEarnedOnDate(employee, event.date));
    return allWages.reduce((total, wage) => total + wage);
  }

  function calculatePayroll(employees) {
    let totalForEmployees = employees.map(record => allWagesFor(record))
    return totalForEmployees.reduce((total, totalTotal) => total + totalTotal)
  }

  function findEmployeeByFirstName(source, name) {
    return source.find(record => record.firstName === name)
  }