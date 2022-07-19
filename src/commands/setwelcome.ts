import { succes, error } from '../messages/embeds'
import welcomeSchema from '../models/welcome-schema'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'

export default {
	category: 'Configuration',
	description: 'Config for norikita.',

	permissions: ['ADMINISTRATOR'],

	minArgs: 2,
	expectedArgs: '<channel> <text> <role>',

	slash: 'both',
	
	testOnly: false,
	hidden: true,

	options: [
		{
			name: 'channel',
			description: 'Choose the channel for the welcome message.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
		},
		{
			name: 'text',
			description: 'The text for the welcome message (@ for the user tag).',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
		},
		{
			name: 'role',
			description: 'The auto role for new users.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.ROLE,
		},
	],

	callback: async ({ guild, message, interaction, args, channel }) => {
		const chan = message ? message.mentions.channels.first() : interaction.options.getChannel('channel')
		const role = message ? message.mentions.roles.first() : interaction.options.getRole('role')

		if (!chan || chan.type !== 'GUILD_TEXT') {
			channel.send({ embeds: [error('Please tag a text channel.', 'Error', '', '', '')] })
			return
		}

		// eslint-disable-next-line prefer-const
		let text = interaction?.options.getString('text')

		if (message) {
			args.shift()
			text = args.join(' ')
		}

		if (!guild) {
			channel.send({ embeds: [error('Please use this command in a guild.', 'Error', '', '', '')] })
			return
		}

		if (!role) {
			channel.send({ embeds: [error('Please define a role.', 'Error', '', '', '')] })
			return
		}

		await welcomeSchema.findOneAndUpdate(
			{
				_id: interaction.guild?.id,
			},
			{
				_id: interaction.guild?.id,
				text,
				channelId: chan?.id,
				roleId: role?.id
			},
			{
				upsert: true
			}
		)
		channel.send({ embeds: [succes('Succesfully set welcome channel.', 'Succes', '', '', '')] })
	}
} as ICommand