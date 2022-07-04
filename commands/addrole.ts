import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord-api-types/v10'
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { mod } = require('../messages/embeds')

module.exports = {
	name: 'addrole',
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Adds a role to a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.addUserOption(option => option.setName('target').setDescription('Select a user'))
		.addRoleOption(option => option.setName('role').setDescription('Select a role')),
	async execute(interaction) {
		const role = interaction.options.getRole('role')
		const user = interaction.options.getMember('target')
		user.roles.add(role)
		await interaction.reply({
			embeds: [mod('Added Role', `Added Role: ${role} to User: ${user}`)],
		})
	},
}