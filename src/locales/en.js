module.exports = {
  translation: {
    commands: {
      balance: {
        success: 'You\'ve got {{balance}} credits <@{{userId}}>',
        fail: 'Sorry, but you don\'t have an address',
      },

      createAddresses: {
        success: 'I\'ve just created adresses for this users: {{names}}',
        fail: 'All users already have an addresses :ok_hand:',
      },
    },
  },
};
