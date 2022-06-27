const { SlashCommandBuilder } = require('@discordjs/builders');
const { codeBlock } = require("@discordjs/builders");
const fs = require('fs-extra')

var LogData = fs.readFileSync("./data/logs/log.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('Replies with Logs!'),
	async execute(interaction) {
		await interaction.reply(codeBlock("json", LogData));
	},
};