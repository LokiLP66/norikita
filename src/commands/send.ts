import { error, info, succes } from '../messages/embeds'
import { ICommand } from 'wokcommands'
import { TextChannel } from 'discord.js'

export default {
	category: 'Servers',
	description: 'Sends a message to a channel.',

	permissions: ['ADMINISTRATOR'],

	minArgs: 3,
	expectedArgs: '<channel> <title> <content>',
	expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING'],

	slash: 'both',

	testOnly: false,
	guildOnly: true,

	callback: async ({ message, interaction, args }) => {
		const chan = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
		if (!chan || chan.type !== 'GUILD_TEXT') {
			message.reply({ embeds: [error('Please tag a text channel.', 'Error', '', '', '')] })
		}

		args.shift()
		const title = args[0]
		args.shift()
		const content = args.join(' ')

		chan.send({ embeds: [info(content, title, '', '', '')] })

		if (interaction) {
			interaction.reply({
				embeds: [succes('Succesfully send the message', 'Succes', '', '', '')],
				ephemeral: true,
			})
		}
	}
} as ICommand