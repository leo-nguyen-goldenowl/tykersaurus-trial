const moment = require('moment')

const convertTeeTimeToMinute = (teeTime) => {
  const listPartOfTeeTime = teeTime.split(':')
  const hourTeeTime = listPartOfTeeTime[0]
  const minuteTeeTime = listPartOfTeeTime[1]

  return Number(hourTeeTime * 60 + minuteTeeTime)
}

const getMaxDate = () => {
  const plusUTC = process.env.NODE_ENV === 'production' ? 8 : 1
  const todayMoment = moment().add(plusUTC, 'hours')
  return moment(todayMoment).add(
    moment(moment(todayMoment)).diff(
      moment(todayMoment.format('MM/DD/YYYY 7:00'), 'MM/DD/YYYY hh:mm'),
      'seconds'
    ) > 0
      ? 7
      : 6,
    'days'
  )
}

const accessBooking = (date) => {
  const maxDate = getMaxDate()

  return (
    moment(moment(maxDate).format('MM/DD/YYYY 00:00')).diff(
      moment(date),
      'seconds'
    ) >= 0
  )
}

module.exports = { convertTeeTimeToMinute, accessBooking, getMaxDate }
