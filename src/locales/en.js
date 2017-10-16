module.exports = {
  translation: {
    commands: {
      balance: {
        success: 'You\'ve got {{balance}} credits <@{{userId}}>',
        fail: 'Sorry, but you don\'t have an address',
      },

      leaderboard: {
        success: '```{{table}}```',
      },

      reinit: {
        success: 'I\'ve just created adresses for this users: {{users}}',
        fail: 'All users already have an addresses :ok_hand:',
      },

      },
    },
  },
};
