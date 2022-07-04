/* eslint-disable no-unused-vars */
import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { info } = require('../messages/embeds')

module.exports = {
	name: 'server',
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction: CommandInteraction) {
		interaction.reply({
			embeds: [info('Server Info', `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)],
		})
	},
}