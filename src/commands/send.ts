import { error, info, succes } from '../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS, { MessageAttachment, TextChannel } from 'discord.js'

export default {
	category: 'Servers',
	description: 'Sends a message to a channel.',

	permissions: ['ADMINISTRATOR'],

	minArgs: 3,
	maxArgs: 4,
	expectedArgs: '<channel> <title> <content> <image>',
	
	options: [
		{
			name: 'channel',
			description: 'Please tag a channel for the message.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
		},
		{
			name: 'title',
			description: 'Please enter a title for the message.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
		},
		{
			name: 'content',
			description: 'Please enter a content for the message.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
		},
		{
			name: 'imageurl',
			description: 'Please enter a image url for the message.',
			required: false,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
		},
	],

	slash: true,

	testOnly: false,
	guildOnly: true,

	callback: async ({ interaction }) => {
		const chan = interaction.options.getChannel('channel') as TextChannel
		const cont = interaction.options.getString('content') as string
		const title = interaction.options.getString('title') as string
		const img_url = interaction.options.getString('imageurl') as string

		if (!chan || chan.type !== 'GUILD_TEXT') {
			interaction.reply({ embeds: [error('Please tag a text channel.', 'Error', '', '', '')] })
		}

		if (img_url) {
			chan.send(img_url)
			chan.send({ 
				embeds: [info(cont, title, '', '', '')],
			})
		}
		else {
			chan.send({
				embeds: [info(cont, title, '', '', '')] 
			})
		}

		interaction.reply({
			embeds: [succes('Succesfully send the message', 'Succes', '', '', '')],
			ephemeral: true,
		})
	}
} as ICommand