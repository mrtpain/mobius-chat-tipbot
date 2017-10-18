# Mobius Chat Tipbot

## Usage

```
Usage @tipbot tip @user <amount>

Tipping:
@tipbot tip @user               # send @user default number of credits
@tipbot tip @user 1000          # send @user 1000 credits

Other commands:
@tipbot balance                 # shows your balance, 'bal' and 'b' also works
@tipbot leaderboard             # see who has what, 'rank' also works
@tipbot donate                  # show the your address for donations
@tipbot send <amount> <address> # send credits to a token address, 'withdraw' also works

In direct message chat, you can issue these commands without prefixing '@tipbot ...'.
```

## Installation

#### 1. Create the Slack bot

[Create and add bot](https://my.slack.com/services/new/bot) in slack for your team.

#### 2. Create a Mobius account

You can create Mobius account on [this](https://mobius.network/store/signup) page, than get your `MOBIUS_API_KEY` at our [developer portal](https://mobius.network/store/developer).


#### 3. Register a token in Mobius

You can register a token by Mobius API via `curl` or `mobius-node` package. Read [API documentation](https://mobius.network/docs/#register) for more information.

#### 3. Deploy the app

Just press this button for deploying app into Heroku

<a href="https://heroku.com/deploy"><img src="https://www.herokucdn.com/deploy/button.svg" target="_blank"></a>

Then fill in the config variables:
  - `SLACK_API_TOKEN`
  - `MOBIUS_API_KEY`,
  - `MOBIUS_TOKEN_UID`
  - `DEFAULT_TIP_AMOUNT`

and click "Deploy for Free" button.

#### 4. Initialize the bot database

Last step, before starting using the bot your should initialize database and create addresses for all team users. Just send command `init` (or `reinit`) to bot and wait to response.

You can also use this command after new team member have been added to chat (all old users addresses will not be affected).

#### 5. Test it out!

Try sending a direct messages to `@tipbot` in private chat, or `/invite @tipbot` to any channel or group. Use `@tipbot help` for a list of commands.
