import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord-api-types/v10'
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { mod } = require('../messages/embeds')

module.exports = {
	name: 'removerole',
	data: new SlashCommandBuilder()
		.setName('removerole')
		.setDescription('Removes a role from a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.addUserOption(option => option.setName('target').setDescription('Select a user'))
		.addRoleOption(option => option.setName('role').setDescription('Select a role')),
	async execute(interaction) {
		const role = interaction.options.getRole('role')
		const user = interaction.options.getMember('target')
		user.roles.remove(role)
		await interaction.reply({
			embeds: [mod('Removed Role', `Removed Role: ${role} from User: ${user}`)],
		})
	},
}
