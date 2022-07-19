import { nsfw, error } from '../messages/embeds'
import akaneko from 'akaneko'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'

export default {
	category: 'NSFW',
	description: 'Replies with a hentai image.',

	minArgs: 1,
	expectedArgs: '<string>',

	slash: 'both',
	testOnly: false,

	cooldown: '20s',

	options: [
		{
			name: 'type',
			description: 'Enter a type of NSFW.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
		},
	],

	callback: async ({ interaction, channel }) => {
		const string = interaction.options.getString('type')

		if (channel.nsfw == false) {
			channel.send({ embeds: [error('Please use this command in a NSFW channel.', 'Error', '', '', '')] })
			return
		} 
		else {
			if (string == 'vanilla') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.hentai())]})
			} else if (string == 'maid') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.maid())]})
			} else if (string == 'succubus') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.succubus())]})
			} else if (string == 'tentacles') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.tentacles())]})
			} else if (string == 'foxgirl') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.foxgirl())]})
			} else if (string == 'bdsm') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.bdsm())]})
			} else if (string == 'doujin') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.doujin())]})
			} else if (string == 'thighs') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.thighs())]})
			} else if (string == 'masturbation') {
				await channel.send({embeds: [nsfw(`Type: ${string}`, 'Hentai!', '', '', await akaneko.nsfw.masturbation())]})
			} else {
				await channel.send({ embeds: [error('Invalid input!', 'Error', '', '', '')] })
			}
		}
	}
} as ICommand