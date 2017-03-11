'use strict';

function composeTimeStamp(date: Date): String {
    let prefix: String = ""
    let weekDayName: String = getTodayWeekDayName(date);
    let monthName: String = geTodayMonthName(date);
    let monthDay: String = date.getDate().toString();
    let time: String = date.toLocaleTimeString('en-US', { hour12: false });
    let timeZoneAbbr: String = getTimeZoneAbbreviation();
    let year: String = date.getFullYear().toString();
    return concatPartsWithDelimiter(" ", [prefix, weekDayName, monthName, monthDay, time, timeZoneAbbr, year]);
}

function geTodayMonthName(date: Date): String {
    // let fullNameList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let shortNameList: String[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let targetIndex: number = date.getMonth();
    return (shortNameList[targetIndex]);
}

function getTodayWeekDayName(date: Date): String {
    // let fullNameList: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let shortNameList: String[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let targetIndex: number = date.getDay();
    return (shortNameList[targetIndex]);
}

////////////////////////////////////////////
// todo: pull out Node.js types

interface NodeRequireFunction {
    (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
    resolve(id:string): string;
    cache: any;
    extensions: any;
    main: any;
}

declare var require: NodeRequire;

////////////////////////////////////////////

function getTimeZoneAbbreviation(): String {
    let timezone = require('moment-timezone');
    let userTimeZone: String = timezone.tz.guess();
    return timezone.tz(userTimeZone).zoneAbbr();
}

function concatPartsWithDelimiter(delimiter: String, partList: String[]): String {
    let result: String[] = [];
    concatNonEmptyPartsAddingDelimiter();
    appendLastPartWithoutAddingDelimiter();
    let concatenatedResult: String = result.join("");
    console.log('concatenatedResult: ' + concatenatedResult);
    return concatenatedResult;

    function concatNonEmptyPartsAddingDelimiter(){
        for (var i = 0; i < partList.length - 1; i++) {
            if(partList[i]){
                result.push(partList[i]);
                result.push(delimiter);
            }
        }
    }

    function appendLastPartWithoutAddingDelimiter(){
        result.push(partList[partList.length - 1]);
    }
}

export default composeTimeStamp;