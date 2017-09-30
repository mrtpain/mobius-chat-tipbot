const slack = require('./slack');

slack.run(process.env.SLACK_API_TOKEN);
