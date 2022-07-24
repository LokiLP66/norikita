import { info } from '../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'

export default {
	category: 'Information',
	description: 'Replies information about the server or a user.',

	minArgs: 1,
	maxArgs: 2,
	expectedArgs: '<about> <member>',

	slash: true,
	testOnly: false,

	options: [
		{
			name: 'about',
			description: 'Info about a member/server (member/server)',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING
		},
		{
			name: 'member',
			description: 'The member',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.USER
		},
	],

	callback: async ({ interaction, channel }) => {
		if (interaction.options.getSubcommand() == 'member') {
			const member = interaction.options.getUser('member')
			if (member) {
				const emb = info('', 'User Info', '', '', '')
				emb.setFields(
					{ name: 'Username:', value: `${member.username}` },
					{ name: 'Userid:', value: `${member.id}` },
					{ name: 'Created at:', value: `${member.createdAt}` },
				)
				emb.setThumbnail(member.defaultAvatarURL)
	
				await channel.send({embeds: [emb]})
			}
			else {
				const emb = info('', 'User Info', '', '', '')
				emb.setFields(
					{ name: 'Username:', value: `${interaction.user.username}` },
					{ name: 'Userid:', value: `${interaction.user.id}` },
					{ name: 'Created at:', value: `${interaction.user.createdAt}` },
				)
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				emb.setThumbnail(interaction.user.avatarURL()!)
	
				await channel.send({embeds: [emb]})
			}
		}
		else if (interaction.options.getSubcommand() == 'server') {
			const emb = info('', 'Server Info', '', '', '')
			emb.setFields(
				{ name: 'Servername:', value: `${interaction.guild?.name}` },
				{ name: 'Serverid:', value: `${interaction.guild?.id}` },
				{ name: 'Created at:', value: `${interaction.guild?.createdAt}` },
			)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
			emb.setThumbnail(interaction.guild?.iconURL()!)
	
			await channel.send({embeds: [emb]})
		}
	}
} as ICommand