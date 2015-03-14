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

function DateHelper(date) {
  return {
    dayOfWeek: dayOfWeek.bind(date),
    month:     month.bind(date),
    lastDate:  lastDate.bind(date)
  }
}

module.exports = DateHelper;
