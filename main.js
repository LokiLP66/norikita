/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Client, Intents, Interaction } = require('discord.js');
const { secrets } = require('./data/config.json');
const { Player } = require('discord-player');
const audioConfig = require('./data/audioConfig');

global.client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

global.player = new Player(client, audioConfig.opt.discordPlayer);

// music events
require('./src/events');

// events/command loader
require('./src/loader');

// Audit Log
require('./src/auditLog');

// InteractionCreate Error
require('./src/interactionError');

// random changing activities
require('./src/activity');

client.login(secrets.token);

