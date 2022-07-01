const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'unban',
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption(option => option.setName('input').setDescription('Select a userId')),
	async execute(interaction) {
		const user = interaction.options.get('input')?.value;
		const guild = interaction.guild;
		guild.members.unban(user);
		await interaction.reply({ embeds: [Embeds.mod('Unbanned User', `Unbanned: ${user}`)] });
	},
};