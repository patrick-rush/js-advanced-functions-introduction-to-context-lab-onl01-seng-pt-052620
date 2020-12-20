function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = array; 
    const timeInEvents = [];
    const timeOutEvents = [];
    const employee = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    }
    return employee;
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => {
        return createEmployeeRecord(array);
    })
}

function createTimeInEvent(employeeObject, dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const record = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    employeeObject.timeInEvents.push(record);
    return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const record = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    employeeObject.timeOutEvents.push(record);
    return employeeObject;
}

function hoursWorkedOnDate(employeeObject, date) {
    function isDate(element) {
        return (element.date === date);
    };
    const timeIn = employeeObject.timeInEvents.find(isDate).hour;
    const timeOut = employeeObject.timeOutEvents.find(isDate).hour;
    const hoursWorked = (timeOut - timeIn) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeObject, date) {
    const hoursWorked = hoursWorkedOnDate(employeeObject, date);
    const wage = employeeObject.payPerHour;
    return hoursWorked * wage;
}

function allWagesFor(employeeObject) {
    const wagesEarned = [];
    const dates = employeeObject.timeInEvents.map((event) => {
        return event.date;
    });
    dates.forEach((date) => {
        wagesEarned.push(wagesEarnedOnDate(employeeObject, date))
    });
    return wagesEarned.reduce((accum, current) => accum + current, 0);
}

function findEmployeeByFirstName(array, firstName) {
    const employee = array.find(employee => employee.firstName === firstName);
    return employee;
}

function calculatePayroll(array) {
    const payroll = array.map(employee => allWagesFor(employee));
    const payrollTotal = payroll.reduce((accum, current) => accum + current);
    return payrollTotal;
}   