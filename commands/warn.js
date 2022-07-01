const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'warn',
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warns a member')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption(option => option.setName('target').setDescription('Select a member')),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		if (!member.roles.cache.some(role => role.name === '❌') && !member.roles.cache.some(role => role.name === '❌❌') && !member.roles.cache.some(role => role.name === '❌❌❌')) {
			member.roles.add('991770397584392202');
			await interaction.reply({
				embeds: [Embeds.mod('Warned', `Warned: ${member} one time`)],
			});
		}
		else if (!member.roles.cache.some(role => role.name === '❌❌') && !member.roles.cache.some(role => role.name === '❌❌❌')) {
			member.roles.add('991770396284162078');
			member.roles.remove('991770397584392202');
			await interaction.reply({
				embeds: [Embeds.mod('Warned', `Warned: ${member} two times`)],
			});
		}
		else if (!member.roles.cache.some(role => role.name === '❌❌❌') && !member.roles.cache.some(role => role.name === 'Muted')) {
			member.roles.add('991770388910579784');
			member.roles.remove('991770396284162078');
			await interaction.reply({
				embeds: [Embeds.mod('Warned', `Warned: ${member} three times`)],
			});
		}
		else {
			member.roles.add('992119953085976607');
			member.roles.remove('991770388910579784');
			setInterval(() => {
				member.roles.remove('992119953085976607');
			}, 1000 * 60 * 60 * 24 * 7);
			await interaction.reply({
				embeds: [Embeds.mod('Muted', `Muted: ${member} for seven days because he/she/it got 3 warns`)],
			});
		}
	},
};
