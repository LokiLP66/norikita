const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'stop',
	voiceChannel: true,
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('######'),

	execute(client, message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

		queue.destroy();

		message.channel.send('Music stopped into this server, see you next time ✅');
	},
};