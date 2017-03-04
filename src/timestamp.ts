'use strict';

function composeTimeStamp(date: Date): string {
    let prefix: string = ""
    let weekDayName: string = getTodayWeekDayName(date);
    let monthName: string = geTodayMonthName(date);
    let monthDay: string = date.getDate().toString();
    let time: string = date.toLocaleTimeString('en-US', { hour12: false });
    let timeZoneAbbr: string = getTimeZoneAbbreviation();
    let year: string = date.getFullYear().toString();
    return concatWithDelimiter(" ", [prefix, weekDayName, monthName, monthDay, time, timeZoneAbbr, year]);
}

function geTodayMonthName(date: Date): string {
    // let fullNameList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let shortNameList: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let targetIndex: number = date.getMonth();
    return (shortNameList[targetIndex]);
}

function getTodayWeekDayName(date: Date): string {
    // let fullNameList: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let shortNameList: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

function getTimeZoneAbbreviation(): string {
    let timezone = require('moment-timezone');
    let userTimeZone: string = timezone.tz.guess();
    return timezone.tz(userTimeZone).zoneAbbr();
}

function concatWithDelimiter(delimiter: string, stringList: string[]): string {
    let result: string[] = [];
    for (var i = 0; i < stringList.length - 1; i++) {
        result.push(stringList[i]);
        result.push(delimiter);
    }
    result.push(stringList[stringList.length - 1]);
    return result.join("");
}

export default composeTimeStamp;