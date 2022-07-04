import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord-api-types/v10'
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { mod } = require('../messages/embeds')

module.exports = {
	name: 'mute',
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mutes a member')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption(option => option.setName('target').setDescription('Select a member'))
		.addNumberOption(option => option.setName('min').setDescription('Enter Minutes')),
	async execute(interaction) {
		const member = interaction.options.getMember('target')
		member.roles.add('992119953085976607')
		setInterval(() => {
			member.roles.remove('992119953085976607')
		}, 1000 * 60 * 'min')
		await interaction.reply({
			embeds: [mod('Muted', `Muted: ${member} for ${'min'} minutes`)],
		})
	},
}
