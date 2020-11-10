// Your code here
function createEmployeeRecord(arr) {
    let result = {}

   return Object.assign(result, {firstName: arr[0], familyName: arr[1], title: arr[2], payPerHour: arr[3], timeInEvents: [],timeOutEvents: [] })
}

function createTimeInEvent(obj, date) {
    let timeEv = exDate(date)
    obj.timeInEvents.push({type: "TimeIn", hour: parseInt(timeEv[1]), date: timeEv[0]})
    return obj
}

function createTimeOutEvent(obj, date) {
    let timeEv = exDate(date)
    obj.timeOutEvents.push({type: "TimeOut", hour: parseInt(timeEv[1]), date: timeEv[0]})
    return obj
}

function exDate(date) {
    let hour = date.split(' ')
    return hour 
}

function createEmployeeRecords(arr) {
    let result = []
    for(const ar of arr) {
        let a = createEmployeeRecord(ar)
        result.push(a)
    }
    return result
}

function hoursWorkedOnDate(obj, date) {
    let result;
    let dayIn = obj.timeInEvents.find(key => key.date==date)
    let dayOut= obj.timeOutEvents.find(key => key.date==date)
     result = dayOut.hour - dayIn.hour
     return result / 100 
}

function wagesEarnedOnDate(ob, date) {
    let hours = hoursWorkedOnDate(ob, date)
    let pay = ob.payPerHour
 //   console.log("hours: ", hours, "pay: ", pay)
        return hours * pay
}

function allWagesFor(ob) {
    let arrDates = [];
    let dates = ob.timeInEvents
  //  console.log("Dates", dates[0].date, dates[1].date)
    for(let data of dates) {
       // console.log("In Loop", data.date)
        arrDates.push(data.date)
      //  console.log("arrDates", arrDates)
    }
    //console.log("Array of Dates", arrDates)
    let wageTotal = [];
    let paid;
    for(let pay of arrDates) {
         paid = wagesEarnedOnDate(ob, pay)
        wageTotal.push(paid)
    }
    //console.log("wageTotal", wageTotal)
    return wageTotal.reduce((prev, next) => prev + next, 0);
}

function findEmployeeByFirstName(srcArray, name) {
    console.log("1st Name = ", name)
    console.log(srcArray)
    console.log(srcArray.find(person => person.firstName === name))
  return srcArray.find(person => person.firstName === name);
}

function calculatePayroll(arr) {
    //console.log(arr)
    let result;
    let subTotal = [];
    for(let empl of arr) {
        let empPay = allWagesFor(empl)
        subTotal.push(empPay)
    }
    //console.log(subTotal)
    return subTotal.reduce((prev, next) => prev + next, 0);
}