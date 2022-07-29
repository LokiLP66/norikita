/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-empty */
import { Client, Intents } from 'discord.js'
const { secrets, ids } = require('./data/config.json')
import WOKCommands from 'wokcommands'
import path from 'path'
import discordModals from 'discord-modals'


// ////////////////////////////////////////////////////////////////////
// CONNECT
// ////////////////////////////////////////////////////////////////////

const client = new Client<boolean>({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	],
})

discordModals(client)

client.on('ready', async () => {
	// own command handler (for context menus)
	let handler = require('./command-handler')
	if (handler.default) handler = handler.default

	handler(client)

	// wokcommands
	const commands = new WOKCommands(client, {
		commandsDir: path.join(__dirname, 'commands'),
		featuresDir: path.join(__dirname, 'features'),
		typeScript: true,
		testServers: ['990521467215171594'],
		mongoUri: secrets.mongodb,
		botOwners: ['655423421110550558'],
	})
	commands.setDisplayName('Fumiko')
	commands.setDefaultLanguage('english')
	commands.setCategorySettings([
		{
			name: 'Help',
			emoji: '✨',
		},
		{
			name: 'NSFW',
			emoji: '🚨',
		},
		{
			name: 'Information',
			emoji: '⁉',
		},
		{
			name: 'Test',
			emoji: '🔧',
			hidden: true,
		},
		{
			name: 'Simulation',
			emoji: '👩‍💻',
			hidden: true,
		},
		{
			name: 'Servers',
			emoji: '💻'
		},
		{
			name:  'Moderation',
			emoji: '🔫',
			hidden: true,
		},
	])
	// status
	client.user?.setStatus('dnd')
})

client.on('modalSubmit', async (modal) => {
	modal.reply('Thank you for answering the form!')
})

// ////////////////////////////////////////////////////////////////////
// Delet Temp
// ////////////////////////////////////////////////////////////////////

client.on('voiceStateUpdate', async (oldState) => {
	if(oldState.channelId) {
		const guild = oldState.channel?.guild
		const voiceChannel = guild?.channels.cache.get(oldState.channelId)
		const member = oldState.member
		const category = guild?.channels.cache.find(c => c.type === 'GUILD_CATEGORY' && c.name === 'tempchannels')
		if (voiceChannel?.parentId == category) {
			if (voiceChannel?.name == `${member?.displayName}'s channel`) {
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
})

// ////////////////////////////////////////////////////////////////////
// LOGIN
// ////////////////////////////////////////////////////////////////////

client.login(secrets.token)
