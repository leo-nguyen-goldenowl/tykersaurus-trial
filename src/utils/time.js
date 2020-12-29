const convertTeeTimeToMinute = (teeTime) => {
  const listPartOfTeeTime = teeTime.split(':')
  const hourTeeTime = listPartOfTeeTime[0]
  const minuteTeeTime = listPartOfTeeTime[1]

  return hourTeeTime * 60 + minuteTeeTime
}

module.exports = { convertTeeTimeToMinute }
