/* eslint-disable no-undef */
const { QueryType } = require('discord-player');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Embeds = require('./../messages/embeds');

module.exports = {
	name: 'play',
	voiceChannel: true,
	data: new SlashCommandBuilder()
		.setName('play')
		.setDefaultMemberPermissions(PermissionFlagsBits.Speak)
		.addStringOption(option => option.setName('input').setDescription('Enter a string'))
		.setDescription('######'),

	async execute(interaction) {
		const string = interaction.options.getString('input');
		const res = await player.search(string, {
			requestedBy: interaction.author,
			searchEngine: QueryType.AUTO,
		});

		if (!res || !res.tracks.length) return interaction.reply(`No results found ${interaction.author}... try again ? ❌`);

		const queue = await player.createQueue(interaction.guild, {
			metadata: interaction.channel,
		});

		try {
			if (!queue.connection) await queue.connect(interaction.voiceChannel);
		}
		catch {
			await player.deleteQueue(interaction.guild.id);
			return interaction.reply(`I can't join the voice channel ${interaction.author}... try again ? ❌`);
		}

		await interaction.reply(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

		res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

		if (!queue.playing) await queue.play();
	},
};