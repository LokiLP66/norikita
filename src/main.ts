/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-empty */
import { Client, Intents } from 'discord.js'
const { secrets, ids } = require('./data/config.json')
import * as commandModules from './commands/commandIndex'
import { succes, error } from './messages/embeds'
import Webpanel from './server/webpanel'
const { createAudioResource, createAudioPlayer } = require('@discordjs/voice');


// ////////////////////////////////////////////////////////////////////
// CONNECT
// ////////////////////////////////////////////////////////////////////

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

export const player = createAudioPlayer();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wp = new Webpanel(secrets.webtoken, ids.port, client)

const channels = client.channels.cache.map(c => c.type)
const channelsId = client.channels.cache.map(c => c.id)
console.log(channels)
console.log(channelsId)

client.on('ready', async () => {
	console.log(`Logged to the client ${client.user?.tag}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`)
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
	interaction.reply({ embeds: [error(errorMessage, 'Error', '', '', '')] })
})

// ////////////////////////////////////////////////////////////////////
// Rainbow Role
// ////////////////////////////////////////////////////////////////////

client.on('ready', async () => {
	const guild = await client.guilds.cache.get('990521467215171594')

	type ColorsResolvable = [
		'#D32F2F',
		'#F44336',
		'#E64A19',
		'#FF5722',
		'#F9A825',
		'#FFEB3B',
		'#558B2F',
		'#2E7D32',
		'#283593',
		'#3F51B5',
		'#6A1B9A',
		'#673AB7'
	]

	const colours: ColorsResolvable = [
		'#D32F2F',
		'#F44336',
		'#E64A19',
		'#FF5722',
		'#F9A825',
		'#FFEB3B',
		'#558B2F',
		'#2E7D32',
		'#283593',
		'#3F51B5',
		'#6A1B9A',
		'#673AB7'
	]

	setInterval(() => {
		const r_colours = colours[Math.floor(Math.random() * colours.length)]
		guild?.roles.edit('994239184342630461', { color: r_colours})
			.then()
			.catch(console.error)
	}, 3000)
})

// ////////////////////////////////////////////////////////////////////
// Temp channel
// ////////////////////////////////////////////////////////////////////

client.on('voiceStateUpdate', async (oldState, newState) => {
	const guild = client.guilds.cache.get('990521467215171594')
	const channelID = '997141182167662693'
	const category = '997151753713766510'
	if(newState.channelId === channelID) {	
		const member: any = newState.member
		const tempChannel = await guild?.channels.create(`${member?.displayName}'s channel`, {
			type: 'GUILD_VOICE',
			parent: category,
		})
		const tempChannelId = tempChannel?.id

		member?.voice.setChannel(tempChannelId)
			.then(() => console.log(`Moved ${member.displayName} to ${tempChannel?.name}`))
			.catch(console.error)
	}
	else if(oldState.channelId) {
		const voiceChannel = guild?.channels.cache.get(oldState.channelId)
		const member: any = oldState.member
		if (voiceChannel?.parentId == category) {
			if (voiceChannel?.name == `${member.displayName}'s channel`) {
				voiceChannel?.delete()
					.then(() => console.log(`Deleted ${voiceChannel?.name}`))
					.catch(console.error)
			}
			else {
				return
			}
		}
		else {
			return
		}
	}
});

// ////////////////////////////////////////////////////////////////////
// LOGIN
// ////////////////////////////////////////////////////////////////////

client.login(secrets.token)