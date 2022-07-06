/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-empty */
import { Client, Intents } from 'discord.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { secrets, ids } = require('./data/config.json')
import * as commandModules from './commands/commandIndex'
import { info, succes, error } from './messages/embeds'

// ////////////////////////////////////////////////////////////////////
// CONNECT
// ////////////////////////////////////////////////////////////////////

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
		'version 3.0.0 - Beta 1',
	]

	setInterval(() => {
		const status = activities[Math.floor(Math.random() * activities.length)]
		client.user?.setPresence({ activities: [{ name: `${status}` }] })
	}, 5000)
})

// ////////////////////////////////////////////////////////////////////
// LOAD COMMANDS
// ////////////////////////////////////////////////////////////////////

const commands = Object(commandModules)

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) {
		return
	}
	const { commandName } = interaction
	commands[commandName].execute(interaction, client)
})

// ////////////////////////////////////////////////////////////////////
// AUTOROLE
// ////////////////////////////////////////////////////////////////////

const autoRoleID = '990521995332558898'
const devAutoRoleID = '991760407716974612'

client.on('guildMemberAdd', async (member) => {

	const role = await member.guild.roles.cache.find(r => r.id === autoRoleID)
	const devRole = await member.guild.roles.cache.find(r => r.id === devAutoRoleID)

	if (role) {
		member.roles.add(role)
		member.send({ embeds: [succes(`You got automatically assigned the role ${role.name}!`, '', '', '', '')] })
	}

	if (devRole) {
		if (member.id == ids.dev) {
			member.roles.add(devRole)
			member.setNickname('ロキ')
			member.send({ embeds: [succes(`You got automatically assigned the role ${devRole.name}!`, '', '', '', '')] })
		}
	}
})

// ////////////////////////////////////////////////////////////////////
// InteractionError
// ////////////////////////////////////////////////////////////////////

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) {
		return
	}
	const { commandName } = interaction
	const command = commands[commandName]
	if (!command) {
		return
	}
	const { errorMessage } = command
	if (!errorMessage) {
		return
	}
	interaction.reply({ embeds: [error(errorMessage, '', '', '', '')] })
})

// ////////////////////////////////////////////////////////////////////
// Rainbow Role
// ////////////////////////////////////////////////////////////////////
/*
client.on('ready', async () => {
	const guild = await client.guilds.cache.get('990521467215171594')

	type ColorsResolvable = [
		'DarkRed',
		'Red',
		'DarkOrange',
		'Orange',
		'DarkGold',
		'Yellow',
		'DarkGreen',
		'Green',
		'DarkBlue',
		'Blue',
		'DarkPurple',
		'Purple',
	]

	const colours: ColorsResolvable = [
		'DarkRed',
		'Red',
		'DarkOrange',
		'Orange',
		'DarkGold',
		'Yellow',
		'DarkGreen',
		'Green',
		'DarkBlue',
		'Blue',
		'DarkPurple',
		'Purple',
	]

	setInterval(() => {
		const r_colours = colours[Math.floor(Math.random() * colours.length)]
		guild?.roles.edit('994239184342630461', { color: r_colours})
			.then(updated => console.log(`Edited role name to ${updated.color}`))
			.catch(console.error)
	}, 1000)
})

*/

client.login(secrets.token)