const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'resume',
	voiceChannel: true,
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('######'),

	execute(client, message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

		const success = queue.setPaused(false);

		return message.channel.send(success ? `Current music ${queue.current.title} resumed ✅` : `Something went wrong ${message.author}... try again ? ❌`);
	},
};