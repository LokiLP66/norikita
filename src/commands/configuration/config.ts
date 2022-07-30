/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { error, info, succes } from '../../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'
import rainbowSchema from '../../models/rainbow-schema'
import welcomeSchema from '../../models/welcome-schema'

export default {
	category: 'Configuration',
	description: 'Command for configuration.',

	slash: true,
	testOnly: false,
	guildOnly: true,

	options: [
		{
			name: 'welcome',
			description: 'Subcommand for welcome message.',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
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
			]
		},
		{
			name: 'rainbowrole',
			description: 'Subcommand for rainbow role.',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
			options: [
				{
					name: 'role',
					description: 'The rainbow role',
					required: true,
					type: DJS.Constants.ApplicationCommandOptionTypes.ROLE,
				},
			]
		},
		{
			name: 'nickname',
			description: 'Subcommand for bot nickname.',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
			options: [
				{
					name: 'name',
					description: 'The nickname.',
					required: true,
					type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
				},
			]
		},
		{
			name: 'avatar',
			description: 'Subcommand for bot avatar.',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
			options: [
				{
					name: 'url',
					description: 'The avatar url.',
					required: true,
					type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
				},
			]
		},
	],

	callback: async ({ interaction, guild, channel, client }) => {
		if (interaction.options.getSubcommand() === 'welcome') {
			const chan = interaction.options.getChannel('channel')
			const role = interaction.options.getRole('role')

			if (!chan || chan.type !== 'GUILD_TEXT') {
				interaction.reply({ embeds: [error('Please tag a text channel.', 'Error', '', '', '')] })
				return
			}

			// eslint-disable-next-line prefer-const
			let text = interaction?.options.getString('text')

			if (!guild) {
				interaction.reply({ embeds: [error('Please use this command in a guild.', 'Error', '', '', '')] })
				return
			}

			if (!role) {
				interaction.reply({ embeds: [error('Please define a role.', 'Error', '', '', '')] })
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
			interaction.reply({ embeds: [succes('Succesfully set welcome channel.', 'Succes', '', '', '')] })
		}
		if (interaction.options.getSubcommand() === 'rainbowrole') {
			const role = interaction.options.getRole('role')

			if (!guild) {
				interaction.reply({ embeds: [error('Please use this command in a guild.', 'Error', '', '', '')] })
				return
			}

			if (!role) {
				interaction.reply({ embeds: [error('Please define a role.', 'Error', '', '', '')] })
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
			interaction.reply({ embeds: [succes('Succesfully set rainbow role.', 'Succes', '', '', '')] })
		}
		if (interaction.options.getSubcommand() === 'nickname') {
			const name = interaction.options.getString('name')
			const bot = guild?.members.cache.get(client.user?.id as string)

			if (!guild) {
				interaction.reply({ embeds: [error('Please use this command in a guild.', 'Error', '', '', '')] })
				return
			}

			if (!name) {
				interaction.reply({ embeds: [error('Please define a name.', 'Error', '', '', '')] })
				return
			}

			bot?.setNickname(name)

			interaction.reply({ embeds: [succes('Succesfully set bot nickname.', 'Succes', '', '', '')] })
		}
		if (interaction.options.getSubcommand() === 'avatar') {
			if (interaction.user.id !== '655423421110550558') interaction.reply({ embeds: [error('Only the bot owner can use this command.', 'Error', '', '', '')] })
			const avatar_url = interaction.options.getString('url')
			// default avatar: https://doc-08-60-docs.googleusercontent.com/docs/securesc/n8f9gdmmqmu8cp7dt8p4pmhlj5b94rpn/ehl10d0fgp4he23192vcl9g01gv56s59/1659102150000/06860086239249480208/06860086239249480208/1KqBoPPSGjCcPqO6RakUeAYaJPM8YVttB?ax=ACxEAsYDbTtslGOHIucafvcOcTIy7Xm3r-P43b70v2Zk-coPcBZ00wHdB9JCL0P20j0tHsTaC2m7E3QuR1O9g1xTIwLiG6TiVAC-pwP_CjE0ooqfmBqZC3DX6BnpP90SHLct07awzlA7ztFXOcYOwcrt9rF10tIBp54Dqv8VpM-hpQQuVlmedS0qMD3HYnssBN6vi2B8aAxhULnbVFeEAhknrnnPG_gvjQOYL8r4mE1Om1t6VMj9NODCgUgAbG_xwfImIZbRPJftSqqqbH2Rj3GqRiZzFM1YKmxn6WYocp6oigtOtmHm3WdPcAXpoip0YTgDBn6t2zpJ3CjzvTj3ozPH0ruWYMQPvkjsM8wzypNljKLPS2Z2kIcVUCx7tk4MQupsZsvAwjWjKHWqmru_Cg3IHkRzT9zKqAlivLmrI-iqsnoc2ZshrXmq1vS49lVEjIotolNRDs-kyYOtnqgNjvqPlxBUeqEw6l5C_ANrdaeExAls_T0vpZ0IRTq8_Qzq3724zRYN5F3UwVq1Hvut-hZEK1GrTPkbLG9D2J7J61iqiYXnq9-o3SCrqcVWyvP-zBY62bZ5nt6DGS3fX5m2Vbnqg3KmVIjbvD5YXPGsAXPRuVvYXjvn6O9zekORWTQ-GqWmK-cqqW8uVEbQ_rB-FTWuk2JxAitHbQR4YsLsQnTrhXF1JcLGCFnWwArCU5rSq7MFxJG7sEr8cHHxlg&uuid=437f4b40-d16e-42eb-8284-a059c9308ab7&authuser=0&nonce=22c7q8m61htpi&user=06860086239249480208&hash=kanfnro3j5eg8nrvfbhq5cv02utqishj

			if (!guild) {
				interaction.reply({ embeds: [error('Please use this command in a guild.', 'Error', '', '', '')] })
				return
			}

			if (!avatar_url) {
				interaction.reply({ embeds: [error('Please define a avatar url.', 'Error', '', '', '')] })
				return
			}

			if (!avatar_url.startsWith('https://')) {
				interaction.reply({ embeds: [error('Please enter a valid url.', 'Error', '', '', '')] })
				return
			}

			client.user?.setAvatar(avatar_url)
            
			interaction.reply({ embeds: [succes('Succesfully set bot avatar.', 'Succes', '', '', '')] })
		}
	}
} as ICommand
