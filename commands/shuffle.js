const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'shuffle',
	voiceChannel: true,
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('######'),

	async execute(client, message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

		if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

		await queue.shuffle();

		return message.channel.send(`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`);
	},
};