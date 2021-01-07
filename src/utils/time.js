const moment = require('moment')

const convertTeeTimeToMinute = (teeTime) => {
  const listPartOfTeeTime = teeTime.split(':')
  const hourTeeTime = listPartOfTeeTime[0]
  const minuteTeeTime = listPartOfTeeTime[1]

  return Number(hourTeeTime * 60 + minuteTeeTime)
}

const getMaxDate = () => {
  const todayMoment = moment()
  return moment(todayMoment).add(
    moment(moment()).diff(
      moment(
        moment().add(-1, 'days').format('MM/DD/YYYY 23:00'),
        'MM-DD-YYYY hh:mm'
      ),
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
