import { Client, Intents } from 'discord.js'
import { secrets } from './data/config.json'

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

export = client

// events/command loader
require('./src/loader')

// Audit Log
require('./src/auditLog')

// InteractionCreate Error
require('./src/interactionError')

// random changing activities
require('./src/activity')

client.login(secrets.token)

