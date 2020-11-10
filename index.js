// Your code here

stuff = ["Mark", "Ruffalo", "Boss", 12]

//This works, the test is just ignorant
function createEmployeeRecordMyWay(array) {
    const [firstName, familyName, title, payPerHour] = array
    employeeRecord = {}
    employeeRecord.firstName = firstName
    employeeRecord.familyName = familyName
    employeeRecord.title = title
    employeeRecord.payPerHour = payPerHour
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

let mark = createEmployeeRecord(stuff);
let mark2 = createEmployeeRecordMyWay(stuff);


function createEmployeeRecords(arrays) {
    return arrays.map(function(e) {
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(obj, date) {
    let parsedDate = date.split(" ")
    debugger
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(parsedDate[1]),
        date: parsedDate[0]
    })

    return obj
}

function createTimeOutEvent(obj, date) {
    let parsedDate = date.split(" ")
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(parsedDate[1]),
        date: parsedDate[0]
    })

    return obj
}

function hoursWorkedOnDate(obj, date) {
    let inDate = obj.timeInEvents.find(e => e.date === date)
    let outDate = obj.timeOutEvents.find(e => e.date === date)
    
    let hoursWorked = outDate.hour - inDate.hour

    return hoursWorked / 100
}

function wagesEarnedOnDate(obj, date) {
    let payOwed = hoursWorkedOnDate(obj, date) * obj.payPerHour
    return payOwed
}

function allWagesFor(obj) {
    let eligibleDates = obj.timeInEvents.map(function(e)
    {
        return e.date
    });

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(obj, d)
    }, 0)

    return payable
};

function findEmployeeByFirstName(array, firstName) {
    let foundEmployee = array.find(e => e.firstName === firstName)
    return foundEmployee ? foundEmployee : undefined
}

function calculatePayroll(array) {
    let allPay = array.map(function(e){
        // console.log(allWagesFor(e))
        return allWagesFor(e)
    })
        console.log(allPay)
    
    let companyWidePayOwed = allPay.reduce(function(accumlator, pay) {
        // console.log(accumlator, pay)
         return accumlator + pay;
    }, 0)
         
    return companyWidePayOwed
}