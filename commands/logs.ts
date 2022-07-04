import { SlashCommandBuilder } from '@discordjs/builders'
import { codeBlock } from'@discordjs/builders'
import { CommandInteraction } from 'discord.js'
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { log } = require('../messages/embeds')

module.exports = {
	name: 'logs',
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('Replies with Logs!'),
	async execute(interaction: CommandInteraction) {
		const logs = require('../data/logs/log.json')
		interaction.reply({
			embeds: [log('Command Logs', codeBlock('json', logs))],
		})
	},
}