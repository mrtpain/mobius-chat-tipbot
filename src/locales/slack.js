/* eslint-disable no-multi-str */

module.exports = {
  commands: {
    balance: {
      success: 'You\'ve got {{balance}} credits {{user}}',
      fail: 'Sorry {{user}}, but you don\'t have an address',
    },

    leaderboard: {
      success: '```{{table}}```',
      fail: 'Oops, something went wrong, please try again.',
    },

    reinit: {
      success: 'I\'ve just created adresses for this users: {{users}}',
      empty: 'All users already have an addresses :ok_hand:',
      fail: 'Oops, something went wrong, please try again.',
    },

    tip: {
      success: 'Sent {{amount}} credits to {{user}}!',
      fail: 'Oops, something went wrong, please try again.',
      failByMaxTip: 'Sorry you can\'t tip more than {{maxTip}} credits.',
      failByMaxTipLifetime: 'Sorry {{user}} can\'t recieve more than {{maxTipLifetime}} credits.',
    },

    send: {
      success: 'Sent {{amount}} credits to `{{address}}`!',
      fail: 'Oops, something went wrong, please try again.',
      failByAmout: 'Sorry, but you don\'t have enough credits.',
    },

    donate: {
      success: '{{user}} your address is `{{address}}`',
      fail: 'Sorry {{user}}, but you don\'t have an address',
    },


    help: '```Usage {{bot}} tip @user <amount>\n\
\n\
Tipping:\n\
{{bot}} tip @user               # send @user {{defaultAmount}} credits\n\
{{bot}} tip @user 1000          # send @user 1000 credits\n\
\n\
Other commands:\n\
{{bot}} balance                 # shows your balance, \'b\' and \'bal\' also works\n\
{{bot}} leaderboard             # see who has what, \'rank\' also works\n\
{{bot}} leaderboard lifetime    # see who has what on bot lifetime, \'rank\' also works\n\
{{bot}} send <amount> <address> # send credits to a token address, \'withdraw\' also works\n\
\n\
In direct message chat, you can issue these commands without prefixing \'{{bot}} ...\'.```',

    unknown: 'Sorry {{user}} but I didn\'t recognize that command.\n\
You сan send me `help` command, for more information.',
  },
};
