import { Client, Intents } from 'discord.js'
import { secrets } from './data/config.json'
import * as commandModules from './commands/commandIndex'

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

client.on('ready', async () => {
	console.log(`Logged to the client ${client.user?.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`)
	client.user?.setStatus('dnd')
})

// ////////////////////////////////////////////////////////////////////
// Activity
// ////////////////////////////////////////////////////////////////////
client.on('ready', async () => {
	const servers = await client.guilds.cache.size
	const servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

	const activities = [
		`On ${servers} servers`,
		`helps ${servercount} users`,
		'by LokiLP66#6622',
		'version 2.0.0',
	]

	setInterval(() => {
		const status = activities[Math.floor(Math.random() * activities.length)]
		client.user?.setPresence({ activities: [{ name: `${status}` }] })
	}, 5000)
})

// ////////////////////////////////////////////////////////////////////
// COMMANDS
// ////////////////////////////////////////////////////////////////////

const commands = Object(commandModules)

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) {
		return
	}
	const { commandName } = interaction
	commands[commandName].execute(interaction, client)
})

exports = client, commands

client.login(secrets.token)

