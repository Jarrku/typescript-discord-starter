import { TextChannel } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';
import * as path from 'path';

const BOT_SECRET = process.env.NODE_ENV !== 'production'
  ? process.env.BOT_SECRET_DEV
  : process.env.BOT_SECRET_PROD;

const client = new CommandoClient({
  disabledEvents: ['TYPING_START'],
  commandPrefix: '!',
  unknownCommandResponse: false
});

client.on('ready', () => client.user.setGame('!help in #role-assignment'));

//Do whatever here
client.registry
  .registerGroups([['shayboy', 'ShayBox'], ['util', 'Utilities']])
  .registerDefaultTypes()
  .registerDefaultCommands({
    prefix: false,
    eval_: false,
    ping: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'Commands'));

client.login(BOT_SECRET);

// close websocket before exiting process -> more graceful while devving :)
process.on('SIGINT', () => {
  client.destroy();
  process.exit(0);
});
