const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'ban',
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const guild = interaction.guild;
		guild.members.ban(user);
		await interaction.reply({
			embeds: [Embeds.mod('Banned User', `Banned: ${user} from Guild: ${guild}`)],
		});
	},
};
