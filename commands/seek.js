const ms = require('ms');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'seek',
	voiceChannel: true,
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('######'),

	async execute(client, message, args) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

		const timeToMS = ms(args.join(' '));

		if (timeToMS >= queue.current.durationMS) return message.channel.send(`The indicated time is higher than the total time of the current song ${message.author}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);

		await queue.seek(timeToMS);

		message.channel.send(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);
	},
};