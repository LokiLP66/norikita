/* eslint-disable no-empty */
import { Client, Intents } from 'discord.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { secrets } = require('./data/config.json')
import * as commandModules from './commands/commandIndex'
import { info, succes } from './messages/embeds'

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

client.on('guildMemberAdd', async (memb) => {

	const role = await memb.guild.roles.cache.get(autoRoleID)

	if (role) {
		memb.roles.add(role).then(() => {
			memb.send({ embeds: [succes(`You got automatically assigned the role ${role.name}!`, '', '', '', '')] })
		})
	}

})

const pres = {
	'990543126965919784': '[Admin]',
	'991760407716974612': '[Dev]'
}

/* 
client.on('guildMemberUpdate', async (mold, mnew) => {
	const guild = mnew.guild

	if ([mold.roles.cache].length < [mnew.roles.cache].length) {
		const role = mnew.roles.cache.find(r => mold.roles.cache.find(_rold => role.id == r.id) == null)
		if (role.id in pres) {
			mnew.setNickname(`${pres?[role.id]} ${mnew.displayName}`)
		}
	}
})
*/

exports = client, commands

client.login(secrets.token)

