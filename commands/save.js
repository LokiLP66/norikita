const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'save',
	voiceChannel: true,
	data: new SlashCommandBuilder()
		.setName('save')
		.setDescription('######'),

	async execute(client, message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

		message.author.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${message.guild.name} ✅`).then(() => {
			message.channel.send('I have sent you the title of the music by private messages ✅');
		}).catch(error => {
			message.channel.send(`Unable to send you a private message ${message.author}... try again ? ❌`);
		});
	},
};