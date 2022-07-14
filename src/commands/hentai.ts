/* eslint-disable no-empty */
import { Client, CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { nsfw, error } from '../messages/embeds'
import akaneko from 'akaneko'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ids } = require('./../data/config.json')

export const data = new SlashCommandBuilder()
	.setName('hentai')
	.setDescription('Replies with Hentai!')
	.addStringOption(option => option
		.setName('type')
		.setDescription('Enter a type of NSFW')
		.setRequired(true)
		.addChoices(
			{ name: 'vanilla', value: 'vanilla' },
			{ name: 'maid', value: 'maid' },
			{ name: 'succubus', value: 'succubus' },
			{ name: 'tentacles', value: 'tentacles' },
			{ name: 'foxgirl', value: 'foxgirl' },
			{ name: 'bdsm', value: 'bdsm' },
			{ name: 'doujin', value: 'doujin' },
			{ name: 'thighs', value: 'thighs' },
			{ name: 'masturbation', value: 'masturbation' },
			{ name: 'bomb', value: 'bomb' },
		)
	)

export async function execute(interaction: CommandInteraction, client: Client) {
	const string = interaction.options.getString('type')

	if (string == 'vanilla') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.hentai())]})
	} else if (string == 'maid') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.maid())]})
	} else if (string == 'succubus') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.succubus())]})
	} else if (string == 'tentacles') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.tentacles())]})
	} else if (string == 'foxgirl') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.foxgirl())]})
	} else if (string == 'bdsm') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.bdsm())]})
	} else if (string == 'doujin') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.doujin())]})
	} else if (string == 'thighs') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.thighs())]})
	} else if (string == 'masturbation') {
		await interaction.reply({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.masturbation())]})
	} else {
		await interaction.reply({ embeds: [error('Invalid input!', 'Error', '', '', '')] })
	}
}