const { SlashCommandBuilder } = require('@discordjs/builders');
const { codeBlock } = require("@discordjs/builders");
const fs = require('fs-extra')
const Embeds = require('../messages/Embeds');

module.exports = {
	name: 'logs',
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('Replies with Logs!'),
	async execute(interaction) {
		let logs = require('../data/logs/log.json')
		interaction.reply({
			embeds: [Embeds.log('Command Logs', codeBlock('json', logs))]
		});
	},
};