const moment = require('moment')

const convertTeeTimeToMinute = (teeTime) => {
  const listPartOfTeeTime = teeTime.split(':')
  const hourTeeTime = listPartOfTeeTime[0]
  const minuteTeeTime = listPartOfTeeTime[1]

  return hourTeeTime * 60 + minuteTeeTime
}

const accessBooking = (date) => {
  const todayMoment = moment()
  const maxDate = moment(todayMoment).add(
    moment(moment()).diff(
      moment(moment().format('MM/DD/YYYY 7:00'), 'MM-DD-YYYY hh:mm'),
      'seconds'
    ) > 0
      ? 7
      : 6,
    'days'
  )

  return (
    moment(moment(maxDate).format('MM/DD/YYYY 00:00')).diff(
      moment(date),
      'seconds'
    ) >= 0
  )
}

module.exports = { convertTeeTimeToMinute, accessBooking }
