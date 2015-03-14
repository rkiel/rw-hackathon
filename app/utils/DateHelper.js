var moment = require('moment');

function dayOfWeek() {
  return moment(this).format('ddd');
}

function month() {
  return moment(this).format('MMMM');
}

function lastDate() {
  return moment(this).endOf('month').get('date');
}

function isWeekday() {
  var sun = 0;
  var sat = 6;

  return (sun < this.getDay()) && (this.getDay() < sat)
}

function isWeekend() {
  var sun = 0;
  var sat = 6;

  return (sun === this.getDay()) || (this.getDay() === sat)
}

function isToday() {
  var today = new Date();
  today = new Date(today.getFullYear(),today.getMonth(),today.getDate());
  return this.getTime() == today.getTime();
}

function DateHelper(date) {
  return {
    dayOfWeek: dayOfWeek.bind(date),
    month:     month.bind(date),
    lastDate:  lastDate.bind(date),
    isWeekday: isWeekday.bind(date),
    isWeekend: isWeekend.bind(date),
    isToday:   isToday.bind(date)
  }
}

module.exports = DateHelper;
