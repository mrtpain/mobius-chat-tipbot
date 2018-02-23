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
@tipbot leaderboard lifetime    # see who has what on bot lifetime, 'rank' also works
@tipbot send <amount> <address> # send credits to a token address, 'withdraw' also works

In direct message chat, you can issue these commands without prefixing '@tipbot ...'.
```

## Installation

### Mobius

#### 1. Create a Mobius account

You can create Mobius account on [this](https://mobius.network/store/signup) page, than get your `MOBIUS_API_KEY` at our [developer portal](https://mobius.network/store/developer).

#### 2. Register a token in Mobius

You can register a token by Mobius API via `curl`, please read [API documentation](https://mobius.network/docs/#register) for it.
Or you can use page `https://<your-app-name>.herokuapp.com/register-uid` (after deploying this app without `MOBIUS_TOKEN_UID` variable).

#### 1. Create the Slack bot

[Create and add bot](https://my.slack.com/services/new/bot) in Slack for your team.

#### 2. Create the Telegram bot

[Create](https://core.telegram.org/bots#3-how-do-i-create-a-bot) Telegram bot and add it to your team channel

#### 2. Deploy the app

Just press this button for deploying app into Heroku

<a href="https://heroku.com/deploy"><img src="https://www.herokucdn.com/deploy/button.svg" target="_blank"></a>

Then fill in the config variables:
  - `SLACK_API_TOKEN`
  - `TELEGRAM_BOT_TOKEN`
  - `MOBIUS_API_KEY`
  - `MOBIUS_TOKEN_UID`
  - `DEFAULT_TIP_AMOUNT`
  - `MAX_TIP`
  - `MAX_TIP_LIFETIME`

and click "Deploy for Free" button.

#### 3. Test it out!

Try sending a direct messages to `@tipbot` in private chat, or `/invite @tipbot` to any channel or group. Use `@tipbot help` for a list of commands.
