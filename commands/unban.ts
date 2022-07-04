import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord-api-types/v10'
import { CommandInteraction } from 'discord.js'
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { mod } = require('../messages/embeds')

module.exports = {
	name: 'unban',
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption(option => option.setName('input').setDescription('Select a userId')),
	async execute(interaction: CommandInteraction) {
		const user = interaction.options.get('input')?.value
		const guild = interaction.guild
		guild.members.unban(user)
		await interaction.reply({ embeds: [mod('Unbanned User', `Unbanned: ${user}`)] })
	},
}