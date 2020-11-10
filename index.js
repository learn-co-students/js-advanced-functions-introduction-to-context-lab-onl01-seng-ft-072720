// Your code here
function createEmployeeRecord(emp){
    const employee = {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: []
    }   
    return employee;
}

function createEmployeeRecords(empArr){
    const newArr = empArr.map(e => createEmployeeRecord(e))
    return newArr;
}

function createTimeInEvent(empObj, datestamp){
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(datestamp.split(" ")[1],10),
        date: datestamp.split(" ")[0]
    }
    empObj.timeInEvents.push(timeIn)
    return empObj
}

function createTimeOutEvent(empObj, datestamp){
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(datestamp.split(" ")[1],10),
        date: datestamp.split(" ")[0]
    }
    empObj.timeOutEvents.push(timeOut)
    return empObj
}

function hoursWorkedOnDate(empObj, date){
    const timeIn = empObj.timeInEvents.find(e => e.date === date);
    const timeOut = empObj.timeOutEvents.find(e => e.date === date);
    const hourIn = timeIn.hour;
    const hourOut = timeOut.hour;
    const hoursWorked = (hourOut - hourIn)/100;
    return hoursWorked;
}

function wagesEarnedOnDate(empObj, date){
    return (hoursWorkedOnDate(empObj, date) * empObj.payPerHour)
}

function allWagesFor(empObj){
    const dates = empObj.timeInEvents.map(e => e.date)
    const wages = dates.map(e => wagesEarnedOnDate(empObj, e))
    return wages.reduce((acc, cur) => acc + cur, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(empsArray){
    return empsArray.map( e => allWagesFor(e)).reduce((acc,  cur) => acc + cur, 0)
}