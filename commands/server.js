const { SlashCommandBuilder } = require('@discordjs/builders');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'server',
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		interaction.reply({
			embeds: [Embeds.info('Server Info', `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)],
		});
	},
};