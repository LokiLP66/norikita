const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'removerole',
	data: new SlashCommandBuilder()
		.setName('removerole')
		.setDescription('Removes a role from a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.addUserOption(option => option.setName('target').setDescription('Select a user'))
		.addRoleOption(option => option.setName('role').setDescription('Select a role')),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const user = interaction.options.getMember('target');
		user.roles.remove(role);
		await interaction.reply({
			embeds: [Embeds.mod('Removed Role', `Removed Role: ${role} from User: ${user}`)],
		});
	},
};
