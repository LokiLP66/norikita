import { nsfw, error } from '../../messages/embeds'
import akaneko from 'akaneko'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'

export default {
	category: 'NSFW',
	description: 'Replies with a hentai image.',

	minArgs: 1,
	expectedArgs: '<string>',
	expectedArgsTypes: ['STRING'],

	slash: true,
	testOnly: false,
	guildOnly: true,

	cooldown: '20s',

	options: [
		{
			name: 'type',
			description: 'Choose a type of NSFW.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
			choices: [
				{ name: 'vanilla', value: 'vanilla' },
				{ name: 'maid', value: 'maid' },
				{ name: 'succubus', value: 'succubus' },
				{ name: 'tentacles', value: 'tentacles' },
				{ name: 'foxgirl', value: 'foxgirl' },
				{ name: 'bdsm', value: 'bdsm' },
				{ name: 'doujin', value: 'doujin' },
				{ name: 'thighs', value: 'thighs' },
				{ name: 'masturbation', value: 'masturbation' },
			],
		},
	],

	callback: async ({ interaction, channel, guild }) => {
		const string = interaction.options.getString('type')

		if (channel.guild) {
			if (!channel.nsfw) {
				interaction.reply({ embeds: [error('Please use this command in a NSFW channel.', 'Error', '', '', '')], ephemeral: true })
				channel.setNSFW(true, 'cause')
				return
			} else {
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
		} else {
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
	}
} as ICommand