import { info } from '../../messages/embeds'
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
			name: 'server',
			description: 'Info about a server!',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND
		},
		{
			name: 'member',
			description: 'Info about a member!',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
			options: [
				{
					name: 'member',
					description: 'The member',
					required: false,
					type: DJS.Constants.ApplicationCommandOptionTypes.USER
				},
			]
		},
		
	],

	callback: async ({ interaction, guild }) => {
		if (interaction.options.getSubcommand() == 'member') {
			const member = interaction.options.getUser('member')
			if (member) {
				const guildMember = guild?.members.cache.get(member.id)
				const tag = guildMember?.user.tag as string
				const id = guildMember?.user.id as string
				const avatar = guildMember?.displayAvatarURL({ dynamic: true, size: 512 }) // `https://cdn.discordapp.com/avatars/${id}/${guildMember?.avatar}.png?size=512`

				const emb = info('', '', '', `${avatar}`, '')
				emb.setAuthor({
					name: tag,
					iconURL: avatar
				})
				emb.setFields(
					{ name: 'ID', value: `${id}` },
					{ name: 'Roles', value: `${guildMember?.roles.cache.map(r => r).join(' ').replace('@everyone', ' ') || 'None'}`},
					{ name: 'Member Since', value: `${guildMember?.joinedAt}`},
					{ name: 'Discord User Since', value: `${guildMember?.user.createdAt}` },
				)
				
				await interaction.reply({embeds: [emb], ephemeral: true})
			}
			else {
				const guildMember = guild?.members.cache.get(interaction.user.id)
				const tag = guildMember?.user.tag as string
				const id = guildMember?.user.id as string
				const avatar = guildMember?.displayAvatarURL({ dynamic: true, size: 512 })

				const emb = info('', '', '', `${avatar}`, '')
				emb.setAuthor({
					name: tag,
					iconURL: avatar
				})
				emb.setFields(
					{ name: 'ID', value: `${id}` },
					{ name: 'Roles', value: `${guildMember?.roles.cache.map(r => r).join(' ').replace('@everyone', ' ') || 'None'}`},
					{ name: 'Member Since', value: `${guildMember?.joinedAt}`},
					{ name: 'Discord User Since', value: `${guildMember?.user.createdAt}` },
				)
				
				await interaction.reply({embeds: [emb], ephemeral: true})
			}
		}
		else if (interaction.options.getSubcommand() == 'server') {
			const tag = guild?.name as string
			const id = guild?.id as string
			const avatar = guild?.iconURL({ dynamic: true, size: 512 }) as string
			const owner = guild?.members.cache.get(guild.ownerId)

			const emb = info('', '', '', `${avatar}`, '')
			emb.setAuthor({
				name: tag,
				iconURL: avatar
			})
			emb.setFields(
				{ name: 'ID', value: `${id}` },
				{ name: 'Owner', value: `${owner?.user.tag}`},
				{ name: 'Owner ID', value: `${owner?.user.id}`},
				{ name: 'Exist Since', value: `${guild?.createdAt}` },
			)
				
			await interaction.reply({embeds: [emb], ephemeral: true})
		}
	}
} as ICommand