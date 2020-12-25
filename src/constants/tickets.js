const session = {
  MORNING  : '07:00,11:59',
  AFTERNOON: '12:00,18:00'
}

const listValidListCriteria = {
  head: {
    [session.MORNING]: {
      player: {
        2: true,
        3: true,
        4: true
      },
      hole: {
        9 : true,
        18: true
      }
    },
    [session.AFTERNOON]: {
      player: {
        2: true,
        3: true,
        4: true
      },
      hole: {
        18: true
      }
    }
  },
  middle: {
    [session.MORNING]: {
      player: {
        3: true,
        4: true
      },
      hole: {
        9 : true,
        18: true
      }
    },
    [session.AFTERNOON]: {
      player: {
        3: true,
        4: true
      },
      hole: {
        18: true
      }
    }
  },
  tail: {
    [session.MORNING]: {
      player: {
        3: true,
        4: true
      },
      hole: {
        18: true
      }
    },
    [session.AFTERNOON]: {
      player: {
        3: true,
        4: true
      },
      hole: {
        18: true
      }
    }
  }
}

module.exports = { listValidListCriteria, session }
