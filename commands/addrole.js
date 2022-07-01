const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'addrole',
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Adds a role to a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.addUserOption(option => option.setName('target').setDescription('Select a user'))
		.addRoleOption(option => option.setName('role').setDescription('Select a role')),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const user = interaction.options.getMember('target');
		user.roles.add(role);
		await interaction.reply({
			embeds: [Embeds.mod('Added Role', `Added Role: ${role} to User: ${user}`)],
		});
	},
};