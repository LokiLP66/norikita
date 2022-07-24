import { error, info } from '../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS, { GuildMember } from 'discord.js'

export default {
	category: 'Moderation',
	description: 'Kicks a specific user.',

	minArgs: 2,
	expectedArgs: '<user> <reason>',
	expectedArgsTypes: ['USER', 'STRING'],

	slash: true,
	testOnly: false,

	permissions: ['KICK_MEMBERS'],

	callback: async ({ interaction, channel, message, args }) => {
		const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
		if (!target) {
			await channel.send({embeds: [error('Please tag someone to kick.', 'Error', '', '', '')]})
			return
		}

		if (!target.kickable) {
			await channel.send({embeds: [error('Cannot kick that user.', 'Error', '', '', '')]})
			return
		}
		
		args.shift()
		const reason = args.join(' ')

		target.kick(reason)

		return {
			custom: true,
			embeds: [
				info(`${target.user.tag} has been kicked.`, 'Kicked', '', '', ''),
			],
			ephemeral: true,
		}
	}
} as ICommand