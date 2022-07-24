import { succes, error } from '../messages/embeds'
import rainbowSchema from '../models/rainbow-schema'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'

export default {
	category: 'Configuration',
	description: 'Config for norikita.',

	permissions: ['ADMINISTRATOR'],

	minArgs: 1,
	expectedArgs: '<role>',

	slash: true,
	
	testOnly: false,
	hidden: true,

	options: [
		{
			name: 'role',
			description: 'The rainbow role',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.ROLE,
		},
	],

	callback: async ({ guild, message, interaction, channel }) => {
		const role = message ? message.mentions.roles.first() : interaction.options.getRole('role')

		if (!guild) {
			channel.send({ embeds: [error('Please use this command in a guild.', 'Error', '', '', '')] })
			return
		}

		if (!role) {
			channel.send({ embeds: [error('Please define a role.', 'Error', '', '', '')] })
			return
		}

		await rainbowSchema.findOneAndUpdate(
			{
				_id: interaction.guild?.id,
			},
			{
				_id: interaction.guild?.id,
				roleId: role?.id
			},
			{
				upsert: true
			}
		)
		channel.send({ embeds: [succes('Succesfully set rainbow role.', 'Succes', '', '', '')] })
	}
} as ICommand