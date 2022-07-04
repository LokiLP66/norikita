import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord-api-types/v10'
import { CommandInteraction } from 'discord.js'
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
	async execute(interaction: CommandInteraction) {
		const role = interaction.options.getRole('role')
		const member = interaction.options.getMember('target')
		member?.roles.add(role)
		await interaction.reply({
			embeds: [mod('Added Role', `Added Role: ${role} to User: ${member}`)],
		})
	},
}