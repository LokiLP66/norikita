/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { info, error } from '../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'

export default {
	category: 'Servers',
	description: 'Creates a temporary channel.',

	slash: 'both',
	testOnly: false,

	minArgs: 2,
	maxArgs: 3,
	expectedArgs: '<subcommand> <action> <member>',

	options: [
		{
			name: 'text',
			description: 'Subcommand for text channels.',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
			options: [
				{
					name: 'action',
					description: 'Enter a action (create/delete/add/remove)',
					required: true,
					type: DJS.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: 'member',
					description: 'Member to add/remove to/from your tempchannel',
					type: DJS.Constants.ApplicationCommandOptionTypes.USER
				},
			]
		},
		{
			name: 'voice',
			description: 'Subcommand for voice channels.',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
			options: [
				{
					name: 'action',
					description: 'Enter a action (create/delete/add/remove)',
					required: true,
					type: DJS.Constants.ApplicationCommandOptionTypes.STRING
				},
				{
					name: 'member',
					description: 'Member to add/remove to/from your tempchannel',
					type: DJS.Constants.ApplicationCommandOptionTypes.USER
				},
			]
		},
	],

	callback: async ({ interaction, client, channel }) => {
		const user = interaction.user
		const guild = interaction.guild
		const tempChannelCategory = guild?.channels.cache.find(c => c.type === 'GUILD_CATEGORY' && c.name === 'tempchannels')
		const tempChannelCategoryId = tempChannelCategory?.id
		const guildMember = guild?.members.cache.get(interaction.user.id)


		if (interaction.options.getSubcommand() === 'text') {
			const action = interaction.options.getString('action')
			if (action == 'create') {
				if (tempChannelCategory) {
					const tempTextChannel = await guild?.channels.create(`${user.username}'s channel`, {
						type: 'GUILD_TEXT',
						parent: tempChannelCategoryId,
						permissionOverwrites: [
							{
								id: user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
							},
							{
								id: guild.id,
								deny: 'VIEW_CHANNEL',
							},
							{
								id: client.user?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
							},
						],
					})
					channel.send({ embeds: [info(`Created <#${tempTextChannel?.id}> in category ${tempChannelCategory.name}`, 'Tempchannel created', '', '', '')] })
				}
				else {
					const tempChannelCategory = await guild?.channels.create('tempchannels', {
						type: 'GUILD_CATEGORY',
					})
					channel.send({ embeds: [info(`Created category ${tempChannelCategory?.name}`, 'Category created', '', '', '')] })
				}
			}
			if (action == 'delete') {
				const chan = guild?.channels.cache.get(channel.id)
			
				if (chan?.parentId == tempChannelCategoryId) {
					chan?.delete()
					user.dmChannel?.send({ embeds: [info(`Deleted channel ${channel?.name}`, 'Channel deleted', '', '', '')] })
				}
				else {
				// eslint-disable-next-line quotes
					channel.send({ embeds: [error("This isn't a tempchannel", 'Error', '', '', '')] })
				}
			}
			if (action == 'add') {
				const chan = guild?.channels.cache.get(channel.id)
				const member = interaction.options.getUser('member')
				if (chan?.parentId == tempChannelCategoryId) {
					chan?.edit({
						permissionOverwrites: [
							{
								id: user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
							},
							{
								id: guild?.id!,
								deny: 'VIEW_CHANNEL',
							},
							{
								id: client.user?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
							},
							{
								id: member?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
							}
						]
					})
					channel.send({ embeds: [info(`Added user <@${member?.id}>`, 'Added user', '', '', '')] })
				} 
				else {
				// eslint-disable-next-line quotes
					channel.send({ embeds: [error("This isn't a tempchannel", 'Error', '', '', '')] })
				}
			}
			if (action == 'remove') {
				const chan = guild?.channels.cache.get(channel.id)
				const member = interaction.options.getUser('member')
				if (chan?.parentId == tempChannelCategoryId) {
					chan?.edit({
						permissionOverwrites: [
							{
								id: user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
							},
							{
								id: guild?.id!,
								deny: 'VIEW_CHANNEL',
							},
							{
								id: client.user?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
							},
							{
								id: member?.id!,
								deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
							}
						]
					})
					channel.send({ embeds: [info(`Removed user <@${member?.id}>`, 'Removed user', '', '', '')] })
				} 
				else {
				// eslint-disable-next-line quotes
					channel.send({ embeds: [error("This isn't a tempchannel", 'Error', '', '', '')] })
				}
			}
		}

		if (interaction.options.getSubcommand() === 'voice') {
			const action = interaction.options.getString('action')
			if (action == 'create') {
				if (tempChannelCategory) {
					const tempVoiceChannel = await guild?.channels.create(`${user.username}'s channel`, {
						type: 'GUILD_VOICE',
						parent: tempChannelCategoryId,
						permissionOverwrites: [
							{
								id: user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
							},
							{
								id: guild.id,
								deny: 'VIEW_CHANNEL',
							},
							{
								id: client.user?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
							},
						],
					})
					if (!guildMember?.voice.channelId == null) {
						guildMember?.voice.setChannel(tempVoiceChannel?.id!)
						interaction.reply({ embeds: [info(`Created ${tempVoiceChannel?.name} in category ${tempChannelCategory.name} and moved <@${guildMember?.id}> to the channel`, 'Tempchannel created', '', '', '')] })
					}
					else {
						interaction.reply({ embeds: [info(`Created ${tempVoiceChannel?.name} in category ${tempChannelCategory.name}`, 'Tempchannel created', '', '', '')] })
					}
				}
				else {
					const tempChannelCategory = await guild?.channels.create('tempchannels', {
						type: 'GUILD_CATEGORY',
					})
					interaction.reply({ embeds: [info(`Created category ${tempChannelCategory?.name}`, 'Category created', '', '', '')] })
				}
			}
			if (action == 'delete') {
				const channelId = guildMember?.voice.channelId
				const channel = guild?.channels.cache.get(channelId!)
			
				if (channel?.parentId == tempChannelCategoryId) {
					channel?.delete()
					user.dmChannel?.send({ embeds: [info(`Deleted channel ${channel?.name}`, 'Channel deleted', '', '', '')] })
				}
				else {
				// eslint-disable-next-line quotes
					interaction.reply({ embeds: [error("This isn't a tempchannel", 'Error', '', '', '')] })
				}
			}
			if (action == 'add') {
				const channelId = guildMember?.voice.channelId
				const channel = guild?.channels.cache.get(channelId!)
				const member = interaction.options.getUser('member')
				if (channel?.parentId == tempChannelCategoryId) {
					channel?.edit({
						permissionOverwrites: [
							{
								id: user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
							},
							{
								id: guild?.id!,
								deny: 'VIEW_CHANNEL',
							},
							{
								id: client.user?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
							},
							{
								id: member?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
							}
						]
					})
					interaction.reply({ embeds: [info(`Added user <@${member?.id}>`, 'Added user', '', '', '')] })
				} 
				else {
				// eslint-disable-next-line quotes
					interaction.reply({ embeds: [error("This isn't a tempchannel", 'Error', '', '', '')] })
				}
			}
			else if (action == 'remove') {
				const channelId = guildMember?.voice.channelId
				const channel = guild?.channels.cache.get(channelId!)
				const member = interaction.options.getUser('member')
				if (channel?.parentId == tempChannelCategoryId) {
					channel?.edit({
						permissionOverwrites: [
							{
								id: user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
							},
							{
								id: guild?.id!,
								deny: 'VIEW_CHANNEL',
							},
							{
								id: client.user?.id!,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
							},
							{
								id: member?.id!,
								deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS']
							}
						]
					})
					interaction.reply({ embeds: [info(`Removed user <@${member?.id}>`, 'Removed user', '', '', '')] })
				} 
				else {
				// eslint-disable-next-line quotes
					interaction.reply({ embeds: [error("This isn't a tempchannel", 'Error', '', '', '')] })
				}
			}
		}
		else {
			// eslint-disable-next-line quotes
			interaction.reply({ embeds: [error("This isn't a subcommand", 'Error', '', '', '')] })
		}
	}
} as ICommand