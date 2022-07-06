import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from '../messages/embeds'

export const data = new SlashCommandBuilder() 
	.setName('help')
	.setDescription('Displays all the commands the bot has.')

class Cmd {
	name!: string
	description!: string

	constructor(name: string, description: string) {
		this.name = name
		this.description = description
	}

	getCmdFunction() {
		return () => {
			const cmd = {
				name: this.name,
				description: this.description
			}
			return cmd
		}
	}
}
// cmds
const cmd_help = new Cmd('help', 'Sends a list with all commands!')
const cmd_ping = new Cmd('ping', 'Replies with Pong!')
const cmd_ticket = new Cmd('ticket [description]', 'Creates a new help ticket.')
const cmd_kick = new Cmd('kick [target]', 'Kick a specific user.')

// to json
const help_json = cmd_help.getCmdFunction()
const ping_json = cmd_ping.getCmdFunction()
const ticket_json = cmd_ticket.getCmdFunction()
const kick_json = cmd_kick.getCmdFunction()

// set array
const cmds = [
	help_json(),
	ping_json(),
	ticket_json(),
	kick_json()
]

// interaction reply
export async function execute(interaction: CommandInteraction) {
	await interaction.reply({embeds: [info('Help for Commands', 'Command Help', '', '', '')
		.addField(`/${cmds[0].name}`, cmds[0].description)
		.addField(`/${cmds[1].name}`, cmds[1].description)
		.addField(`/${cmds[2].name}`, cmds[2].description)
		.addField(`/${cmds[3].name}`, cmds[3].description)
	]})
}