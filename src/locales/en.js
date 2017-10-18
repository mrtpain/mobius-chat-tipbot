/* eslint-disable no-multi-str */

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

      tip: {
        success: 'Sent {{amount}} credits to {{user}}!',
      },

      send: {
        success: 'Sent {{amount}} credits to `{{address}}`!',
      },

      donate: {
        success: '{{user}} your address is `{{address}}`',
      },


      help: '```Usage {{bot}} tip @user <amount>\n\
\n\
Tipping:\n\
{{bot}} tip @user               # send @user {{defaultAmount}} credits\n\
{{bot}} tip @user 1000          # send @user 1000 credits\n\
\n\
Other commands:\n\
{{bot}} balance                 # shows your balance, \'bal\' also works\n\
{{bot}} leaderboard             # see who has what, \'rank\' also works\n\
{{bot}} donate                  # show the your address for donations\n\
{{bot}} send <amount> <address> # send credits to a token address, \'withdraw\' also works\n\
\n\
In direct message chat, you can issue these commands without prefixing \'{{bot}} ...\'.```',

      unknown: 'Sorry {{user}} but I didn\'t recognize that command.\n\
You сan send me `help` command, for more information.',
    },
  },
};
